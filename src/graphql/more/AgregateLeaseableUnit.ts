import { objectType } from 'nexus'

export const AggregateLeasableUnit = objectType({
  name: 'AggregateLeasableUnit',
  definition(t) {
    t.nonNull.int('count')
  },
})
