## Setup the project

> 
  npm init -y
  npm i --save-dev prisma ts-node-dev typescript
  npm i @prisma/client apollo-server graphql nexus

> tsconfig.ts

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

> Add package.json (scripts):

  "dev": "ts-node-dev --transpile-only --no-notify api/app.ts",
  "build": "tsc"

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

  - Setup ur postgres config in .env

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

> 


