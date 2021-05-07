import { objectType } from 'nexus'

export const Agent = objectType({
  name: 'Agent',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('user', { type: 'User' })
    t.field('leasableUnit', { type: 'LeasableUnit' })
  },
})
