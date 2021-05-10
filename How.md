## Setup the project

> 
    npm init -y
    npm i --save-dev prisma ts-node-dev typescript
    npm i @prisma/client apollo-server graphql nexus

> tsconfig.ts

```json
  {
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "lib": ["esnext"],
        "strict": true,
        "rootDir": ".",
        "outDir": "dist",
        "sourceMap": true,
        "esModuleInterop": true
    }
  }
```

> Add package.json (scripts):

    "dev": "ts-node-dev --transpile-only --no-notify api/app.ts",
    "build": "tsc",

> folders: src/

    graphql
    index.ts
    app.ts
    context.ts
    db.ts
    schema.ts
    server.ts

## Setup the database

> DB

    // Login
    psql -U postgres;

    // Create database
    CREATE DATABASE companyCompetenceDatabase;

    // Confirm database creation
    \l

## Adding the Prisma schema data models

> Adding the Prisma schema data models

    prisma init

  - Setup ur postgres config in .env with 

    DATABASE_URL="postgresql://postgres:''@localhost:5432/companycompetencedatabase?schema=public"


> Add models to schema.prisma

    // 1-n with trade and role
    // company can have many roles
    model Company {
      id            Int      @id @default(autoincrement())
      name          String?
      contactPerson String?
      bio           String?
      email         String?
      website       String?
      roles         Role[]
    }

    // 1-n with skill, n-1 with company
    // a role can have many skills
    // a company can have many roles
    model Role {
      id        Int     @id @default(autoincrement())
      name      String?
      skills    Skill[]
      company   Company? @relation(fields: [companyId], references: [id]) // not in db, used by Prisma to set relation
      companyId Int? // the foreign key, this is in the db
    }

    // 1-n with role
    model Skill {
      id     Int    @id @default(autoincrement())
      name   String?
      role   Role?   @relation(fields: [roleId], references: [id])
      roleId Int?
    }

> With models already added, then create a migrate

    prisma migrate dev --name init --preview-feature

    - Deplot migration:
    
      npx prisma migrate deploy

## Using the Nexus objectType 

> src/graphql/company.ts

```typescript
import { objectType } from 'nexus';

export const Company = objectType({
  name: 'Company',
  definition(t) {
    t.nonNull.int('id');
    t.string('name');
    t.string('contactPerson');
    t.string('bio');
    t.string('email');
    t.string('website');
    t.int('roleId');
    t.nonNull.list.nonNull.field('roles', {
      type: 'Role',
      resolve: (parent, _, ctx) => {
        return ctx.db.company
          .findUnique({
            where: { id: parent.id },
          })
          .roles();
      },
    });
  },
});
```

> src/graphql/role.ts

```typescript
import { objectType } from 'nexus';

export const Role = objectType({
  name: 'Role',
  definition(t) {
    t.nonNull.int('id');
    t.string('name');
    t.field('company', {
      type: 'Company',
      resolve: (parent, _, ctx) => {
        return ctx.db.role
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .company();
      },
    });
    t.list.field('skills', {
      type: 'Skill',
      resolve: (parent, _, ctx) => {
        return ctx.db.role
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .skills();
      },
    });
  },
});
```

> src/graphql/skill.ts

```typescript
import { objectType } from 'nexus';

export const Skill = objectType({
  name: 'Skill',
  definition(t) {
    t.nonNull.int('id');
    t.string('name');
    t.field('role', {
      type: 'Role',
      resolve: (parent, _, ctx) => {
        return ctx.db.skill
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .role();
      },
    });
  },
});
```

> src/graphql/index.ts
```typescript
export * from './company';
export * from './role';
export * from './skill';
```

## Creating the server

> src/schema.ts

```typescript
import { makeSchema } from 'nexus';
import { join } from 'path';
// It is considered best practice to pass your types directly from a "star import" like we've done above. Under the hood, Nexus will unwrap the types. This prevents from constantly having to manually export & import every single type of your API.
import * as types from './graphql';

export const schema = makeSchema({
  // GraphQL types that will be used to construct your GraphQL schema.
  types,
  outputs: {
    // Output path to where nexus should write the generated TypeScript definition types derived from your schema. This is mandatory to benefit from Nexus' type-safety.
    typegen: join(__dirname, './generated/nexus-typegen.ts'),
    // Output path to where nexus should write the SDL (schema definition language) version of your GraphQL schema.
    schema: join(__dirname, './generated/schema.GraphQL'),
  },
  contextType: {
    // Path to the module where the context type is exported
    module: join(__dirname, './context.ts'),
    // Name of the export in that module
    export: 'Context',
  },
});
```

> src/server.ts

```typescript
import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context } from './context';

export const server = new ApolloServer({ schema, context });
```

> src/app.ts

```typescript
import { server } from './server';

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
```

## The GraphQL context

> src/db.ts

```typescript
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();
```

> src/context.ts

```typescript
import { db } from './db';
import { PrismaClient } from '@prisma/client';

export interface Context {
  db: PrismaClient;
}

export const context = {
  db,
};
```

## Writing queries and mutations

> Add to src/graphql/company.ts

```typescript
export const CompanyQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all companies
    t.list.field('companies', {
      type: 'Company',
      resolve(_root, _args, ctx) {
        return ctx.db.company.findMany();
      },
    });
    // get company by id
    t.field('company', {
      type: 'Company',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.company.findUnique({
          where: { id: args.id },
        });
      },
    });
    t.list.field('roles', {
      type: 'Role',
      resolve(_root, _args, ctx) {
        return ctx.db.role.findMany();
      },
    });
  },
});
```

```typescript
export const CompanyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a new company
    t.nonNull.field('createCompany', {
      type: 'Company',
      args: {
        id: intArg(),
        name: nonNull(stringArg()),
        contactPerson: nonNull(stringArg()),
        bio: nonNull(stringArg()),
        email: nonNull(stringArg()),
        website: nonNull(stringArg()),
        roleId: intArg(),
        roles: arg({
          type: list('RoleInputType'),
        }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.company.create({
          data: {
            name: args.name,
            contactPerson: args.contactPerson,
            bio: args.bio,
            email: args.email,
            website: args.website,
            roles: {
              connect: [{ id: args.roleId || undefined }],
            },
          },
        });
      },
    });
    // update a company by id
    t.field('updateCompany', {
      type: 'Company',
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        contactPerson: stringArg(),
        bio: stringArg(),
        email: stringArg(),
        website: stringArg(),
        roleId: intArg(),
        roles: arg({
          type: list('RoleInputType'),
        }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.company.update({
          where: { id: args.id },
          data: {
            name: args.name,
            contactPerson: args.contactPerson,
            bio: args.bio,
            email: args.email,
            website: args.website,
            roles: {
              connect: [{ id: args.roleId || undefined }],
            },
          },
        });
      },
    });
    // delete a company by id
    t.field('deleteCompany', {
      type: 'Company',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.company.delete({
          where: { id: args.id },
        });
      },
    });
  },
});
```


## Running our queries and mutations in the Playground

> Run

    npm run dev

### Examples Mutations

> Create skill

```
mutation CreateSkill {
  createSkill(name: "GraphQL") {
    id
    name
  }
}
```

> create Role

```
mutation CreateRole {
  createRole(name: "Backend Developer" skillId: 1) {
    id
    name
  }
}
```

> Create company 

```
mutation CreateCompany {
  createCompany(
    name: "My Super Cool Company"
    bio: "A super cool company"
    website: "mycomp.com"
    contactPerson: "Barry McBarry"
    email: "barry@mycomp.com"
    roleId: 1
  ) {
    name
    bio
    website
    contactPerson
    email
    roles {
      name
      skills {
        name
      }
    }
  }
}
```

### Example Queries

> get all companies and their roles and skills

```
query GetCompanies {
  companies {
    id
    name
    contactPerson
    bio
    email
    website
    roles {
      name
      skills {
        name
      }
    }
  }
}
```

> get all roles and their skills

```
query GetRoles {
  roles {
    id
    name
    skills {
      name
    }
  }
}
```

> get all skills

```
query GetSkills {
  skills {
    id
    name
  }
}
```