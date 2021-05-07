import { objectType } from 'nexus'

export const ProductType = objectType({
  name: 'ProductType',
  definition(t) {
    t.nullable.int('id')
    t.nullable.string('name')
    t.nullable.field('createdAt', {
      type: 'DateTime',
    })
    t.nullable.field('updatedAt', {
      type: 'DateTime',
    })
    t.nullable.list.field('LeasableUnit', {
      type: 'LeasableUnit',
    })
    // t.nullable.string('product_specializations')
    t.nullable.list.field('Property', {
      type: 'Property',
    })
    // t.nullable.string('PropertyCategoryType')
    t.nullable.string('SiteRequirement')
  },
})
