import { arg, extendType, idArg, inputObjectType, intArg, nonNull, objectType, stringArg } from 'nexus';

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

export const RoleInputType = inputObjectType({
  name: 'RoleInputType',
  definition(t) {
    t.nonNull.int('id')
  },
})


export const RoleMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a new company
    t.nonNull.field('createRole', {
      type: 'Company',
      args: {
        name: nonNull(stringArg()),
        skillId: intArg()
      },
      resolve(_root, args, ctx) {
        return ctx.db.role.create({
          data: {
            name: args.name,
            skills: {
              connect: [{ id: args.skillId || undefined }],
            }
          },
        });
      },
    });
    
  },
});