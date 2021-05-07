import { objectType } from 'nexus'

export const Property = objectType({
  name: 'Property',
  definition(t) {
    t.nonNull.string('businessKey')
    t.nonNull.string('name')
    t.nonNull.int('productType')
  },
})
