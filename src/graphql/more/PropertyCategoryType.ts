import { objectType } from 'nexus'

export const PropertyCategoryType = objectType({
  name: "PropertyCategoryType",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.field("createdAt", { type: 'DateTime' })
    t.nonNull.string("name")
    t.field("productType", { type: 'ProductType' })
    t.list.nonNull.field("properties", {
      type: 'Property',
      args: {
        // where: arg({ type: PropertyWhereInput }),
        // orderBy: arg({ type: PropertyOrderByInput }),
        // skip: intArg(),
        // after: stringArg(),
        // before: stringArg(),
        // first: intArg(),
        // last: intArg(),
      },
    })
    t.list.nonNull.field("propertySubCategoryTypes", {
      type: 'PropertySubCategoryType',
      args: {
        // where: arg({ type: PropertySubCategoryTypeWhereInput }),
        // orderBy: arg({ type: PropertySubCategoryTypeOrderByInput }),
        // skip: intArg(),
        // after: stringArg(),
        // before: stringArg(),
        // first: intArg(),
        // last: intArg(),
      },
    })
    t.list.nonNull.field("siteRequirements", {
      type: 'SiteRequirement',
      args: {
        // where: arg({ type: SiteRequirementWhereInput }),
        // orderBy: arg({ type: SiteRequirementOrderByInput }),
        // skip: intArg(),
        // after: stringArg(),
        // before: stringArg(),
        // first: intArg(),
        // last: intArg(),
      },
    })
    t.nonNull.field("updatedAt", { type: 'DateTime' })
  }
})