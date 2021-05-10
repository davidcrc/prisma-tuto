import { arg, intArg, objectType, stringArg } from 'nexus'

export const Country = objectType({
  name: 'Country',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.list.string('fipsCode')
    t.string('shortCode')
    t.string('longCode')

    //   TODO:
    t.list.nonNull.field('states', {
      type: 'State',
      args: {
          // where: arg({ type: 'StateWhereInput' }),
          // orderBy: arg({ type: 'StateOrderByInput' }),
          // skip: intArg(),
          // after: stringArg(),
          // before: stringArg(),
          // first: intArg(),
          // last: intArg(),
      },
      resolve(parent , __, ctx) {
        return ctx.db.country.findUnique({ where: { id: parent.id } }).State()
      },
    })
  },
})
