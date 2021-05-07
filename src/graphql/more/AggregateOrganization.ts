import { objectType } from 'nexus'

export const AggregateOrganization = objectType({
  name: 'AggregateOrganization',
  definition(t) {
    t.nonNull.int('count')
  },
})
