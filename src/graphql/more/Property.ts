import { objectType } from 'nexus'

export const Property = objectType({
  name: "Property",
  definition(t) {
    t.string("businessKey")
    t.string("name")
    t.field("productType", { 
      type: 'ProductType',
      resolve(parent, _, ctx) {
        return ctx.db.property.findUnique({ where: { id: parent.id } }).ProductType()
      },
    })
  }
})