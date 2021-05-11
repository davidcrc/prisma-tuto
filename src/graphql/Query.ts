import { intArg, objectType } from 'nexus'
import { getUserId } from '../utils'
import { connectionFromArray } from 'graphql-relay'

// Relay connections cursor-based pagination
export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nullable.list.field('addresses', {
      type: 'Address',
      resolve(_root, _args, ctx) {
        return ctx.db.address.findMany()
      },
    })
    t.nullable.list.field('leasableUnits', {
      type: 'LeasableUnit',
      resolve(_root, _args, ctx) {
        return ctx.db.leasableUnit.findMany()
      },
    })
    // t.connectionField('leasableUnitsConnection', {
    //   type: 'LeasableUnit',
    //   nodes(root, args, ctx, info) {
    //     return ctx.db.leasableUnit.resolveForConnection(
    //       root,
    //       args,
    //       ctx,
    //       info,
    //     )
    //   },
    // })

    t.connectionField('leasableUnitsConnection', {
      type: 'LeasableUnit',
      async resolve(root, args, ctx) {
        // console.log("Los argumentos", args);
        
        const { edges, pageInfo } = connectionFromArray(await ctx.db.leasableUnit.findMany() , args)
        return {
          edges,
          pageInfo: {
            ...pageInfo,
            hasNextPage: Boolean(pageInfo.hasNextPage),
            hasPreviousPage: Boolean(pageInfo.hasPreviousPage),
          },
        }
      },
    })

    t.field('me', {
      type: 'User',
      resolve: (_parent, _args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.db.user.findUnique({ where: { id: Number(userId) } })
      },
    })


    t.field('org', {
      type: 'Organization',
      args: {
        id: intArg()
      },
      resolve: (_parent, _args, ctx) => {
        
        return ctx.db.organization.findUnique({ where: { id: _args.id } })
      },
    })

    // t.connectionField('organizations', {
    //   type: 'Organization',
    //   resolve: async (_parent, args, ctx) => {
    //     const data = await ctx.db.organizationsConnection({
    //       first: args.first || undefined,
    //       after: args.after || undefined,
    //       where: args.where || undefined,
    //     })
    //     const array = data.edges.map(async (item: Organization) => {
    //       const attach = await ctx.db.activeStorageAttachments({
    //         where: {
    //           AND: [
    //             {
    //               record: item.node.id,
    //               recordType: 'Organization',
    //             },
    //           ],
    //         },
    //       })
    //       if (attach.length === 0) return { ...item }

    //       const { blob } = attach[0]

    //       const res = await ctx.db.activeStorageBlob({ id: blob })
    //       const key = res && res.key
    //       return {
    //         node: {
    //           ...item.node,
    //           logo: `https://dev-es-core.s3.us-east-2.amazonaws.com/${key}`,
    //         },
    //         cursor: item.cursor,
    //       }
    //     })

    //     return {
    //       pageInfo: data.pageInfo,
    //       edges: [...array],
    //     }
    //   },
    // })

    t.connectionField('organizations', {
      type: 'Organization',
      async resolve(root, args, ctx) {
        // console.log("Los argumentos", args);
        
        const { edges, pageInfo } = connectionFromArray(await ctx.db.organization.findMany() , args)
        return {
          edges,
          pageInfo: {
            ...pageInfo,
            hasNextPage: Boolean(pageInfo.hasNextPage),
            hasPreviousPage: Boolean(pageInfo.hasPreviousPage),
          },
        }
      },
    })
  },
})