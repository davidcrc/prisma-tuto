import { objectType } from 'nexus'

export const ProductType = objectType({
  name: 'ProductType',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.string('name')
    t.nullable.list.field('properties', {
      type: 'Property',
    })
    // t.nonNull.list.field('propertyCategoryTypes', {
    //   type: 'PropertyCategoryType'
    // })
    // t.nonNull.list.field('siteRequirements', {
    //   type: 'SiteRequirement'
    // })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})
