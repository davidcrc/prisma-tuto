import { extendType, intArg, nonNull } from "nexus";
import { getUserId } from '../utils'

const CompanyQuery = extendType({
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

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.list.field('addresses', {
      type: 'Address',
      resolve(_root, _args, ctx) {
        return ctx.db.address.findMany();
      },
    })

    t.field('me', {
      type: 'User',
      resolve: (_parent, _args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.db.user.findUnique({ where: { id: Number(userId) }})
      },
    })
  },
});