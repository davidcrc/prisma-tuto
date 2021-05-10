import { objectType } from 'nexus'

export const State = objectType({
  name: 'State',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.int('fipsCode')
    t.field('country', { 
      type: 'Country',
      resolve(parent, _, ctx) {
        return ctx.db.state.findUnique({ where: { id: parent.id } }).Country()
      },
    })

    //   TODO:
    t.list.nonNull.field('counties', {
      type: 'County',
      args: {
        //   where: arg({ type: CountyWhereInput }),
        //   orderBy: arg({ type: CountyOrderByInput }),
        //   skip: intArg(),
        //   after: stringArg(),
        //   before: stringArg(),
        //   first: intArg(),
        //   last: intArg(),
      },
      resolve(parent, _, ctx) {
        return ctx.db.state.findUnique({ where: { id: parent.id } }).County()
      },
    })

    //   TODO:
    t.list.nonNull.field('places', {
      type: 'Place',
      args: {
        //   where: arg({ type: PlaceWhereInput }),
        //   orderBy: arg({ type: PlaceOrderByInput }),
        //   skip: intArg(),
        //   after: stringArg(),
        //   before: stringArg(),
        //   first: intArg(),
        //   last: intArg(),
      },
      resolve(parent, _, ctx) {
        return ctx.db.state.findUnique({ where: { id: parent.id } }).Place()
      },
    })
  },
})
