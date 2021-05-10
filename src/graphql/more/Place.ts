import { objectType } from 'nexus'

export const Place = objectType({
  name: 'Place',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.int('fipsCode')
    t.field('state', { 
      type: 'State',
      resolve(parent, _, ctx) {
        return ctx.db.place.findUnique({ where: { id: parent.id } }).State()
      },
    })
  },
})
