import { objectType } from 'nexus'

export const PropertySubCategoryType = objectType({
  name: "PropertySubCategoryType",
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
      resolve(parent , __, ctx) {
        return ctx.db.propertySubCategoryType.findUnique({ where: { id: parent.id } }).Property()
      },
    })
    t.field("propertyCategoryType", { type: 'PropertyCategoryType' })
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
      resolve(parent , __, ctx) {
        return ctx.db.propertySubCategoryType.findUnique({ where: { id: parent.id } }).SiteRequirement()
      },
    })
    t.nonNull.field("updatedAt", { type: 'DateTime' })
  }
})