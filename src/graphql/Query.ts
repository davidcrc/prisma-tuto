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

    t.nullable.list.field('leasableUnits', {
      type: 'LeasableUnit',
    })

    t.connectionField('leasableUnitsConnection', {
      type: 'LeasableUnit',
      // disableBackwardPagination: false,
      resolve: (_parent, _args, ctx) => {
        
      },
    })

    t.field('me', {
      type: 'User',
      resolve: (_parent, _args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.db.user.findUnique({ where: { id: Number(userId) }})
      },
    })

    t.connectionField('organizations', {
      type: 'Organization',
      additionalArgs:{
        
      },
      resolve: async (_parent, args, ctx) => {
        const data = await ctx.db.organizationsConnection({
          first: args.first || undefined,
          after: args.after || undefined,
          where: args.where || undefined,
        })
        const array = data.edges.map(async (item: Organization) => {
          const attach = await ctx.db.activeStorageAttachments({
            where: {
              AND: [
                {
                  record: item.node.id,
                  recordType: 'Organization',
                },
              ],
            },
          })
          if (attach.length === 0) return { ...item }

          const { blob } = attach[0]

          const res = await ctx.db.activeStorageBlob({ id: blob })
          const key = res && res.key
          return {
            node: {
              ...item.node,
              logo: `https://dev-es-core.s3.us-east-2.amazonaws.com/${key}`,
            },
            cursor: item.cursor,
          }
        })

        return {
          pageInfo: data.pageInfo,
          edges: [...array],
        }
      },
    })
  },
});