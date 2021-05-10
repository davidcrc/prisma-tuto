import { objectType } from 'nexus'

export const SiteRequirement = objectType({
  name: "SiteRequirement",
  definition(t) {
    t.nonNull.int("id")
    t.string("accessRequirements")
    t.float("landAverageAcres")
    t.float("landMaxAcres")
    t.float("landMinAcres")
    t.list.nonNull.field("organizations", {
      type: 'Organization',
      args: {
        // where: arg({ type: OrganizationWhereInput }),
        // orderBy: arg({ type: OrganizationOrderByInput }),
        // skip: intArg(),
        // after: stringArg(),
        // before: stringArg(),
        // first: intArg(),
        // last: intArg(),
      },
      resolve(parent, _, ctx) {
        return ctx.db.siteRequirement.findUnique({ where: { id: parent.id } }).Organization()
      },
    })
    t.int("parkingStallsCount")
    t.float("parkingStallsPerSqFt")
    t.field("productType", { 
      type: 'ProductType' ,
      resolve(parent, _, ctx) {
        return ctx.db.siteRequirement.findUnique({ where: { id: parent.id } }).ProductType()
      },
    })
    t.field("propertyCategoryType", { 
      type: 'PropertyCategoryType' ,
      resolve(parent, _, ctx) {
        return ctx.db.siteRequirement.findUnique({ where: { id: parent.id } }).PropertyCategoryType()
      },
    })
    t.field("propertySubCategoryType", { 
      type: 'PropertySubCategoryType' ,
      resolve(parent, _, ctx) {
        return ctx.db.siteRequirement.findUnique({ where: { id: parent.id } }).PropertySubCategoryType()
      },
    })
    t.int("trafficRequirements")
  }
})