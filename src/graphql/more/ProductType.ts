import { objectType } from 'nexus'

export const ProductType = objectType({
  name: "ProductType",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.field("createdAt", { type: 'DateTime' })
    t.nonNull.string("name")
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
    t.list.nonNull.field("propertyCategoryTypes", {
      type: 'PropertyCategoryType',
      args: {
        // where: arg({ type: PropertyCategoryTypeWhereInput }),
        // orderBy: arg({ type: PropertyCategoryTypeOrderByInput }),
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