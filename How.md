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
    typegen: join(__dirname, '..', './generated/nexus-typegen.ts'),
    // Output path to where nexus should write the SDL (schema definition language) version of your GraphQL schema.
    schema: join(__dirname, '..', './generated/schema.GraphQL'),
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
