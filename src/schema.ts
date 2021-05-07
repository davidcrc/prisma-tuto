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
  // sourceTypes: {
  //   modules: [{
  //     //       ^---------------------- Path to the file containing your Source Types
  //     module: join(__dirname, '..', './node_modules/.prisma/client/index.d.ts'),
  //     alias: 'tipo'
  //     //      ^----- Arbitrary unique name used as alias to import your Source Types.
  //     //             eg: import * as <alias> from <source>
  //     //             Make sure to use unique aliases if you have multiple sources
  //   }],
  //   mapping: {
  //     Country: 'tipo.Country'
  //   // ^-----^------^---------- GraphQL type name
  //   //       |------|---------- Alias of the source where the Source Type is defined
  //   //              |---------- Source Type name to use for the `User` GraphQL type name
  //   }
  // },
  contextType: {
    // Path to the module where the context type is exported
    module: join(__dirname, './context.ts'),
    // Name of the export in that module
    export: 'Context',
  },
});