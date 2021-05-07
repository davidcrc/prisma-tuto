import { objectType } from 'nexus'

export const County = objectType({
  name: 'County',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.int('fipsCode')
    t.field('state', { type: 'State' })
  },
})
