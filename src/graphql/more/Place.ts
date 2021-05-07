import { objectType } from 'nexus'

export const Place = objectType({
  name: 'Place',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.int('fipsCode')
    t.field('state', { 
      type: 'State',
      resolve: (_parent, _args, ctx) => {
        
        console.log(_parent)
        return ctx.db.state.findMany({ where: { state_id: _parent.id }})
      },
    })
  },
})
