import { objectType } from 'nexus'
import * as tipo from "@prisma/client"

export const Address = objectType({
  name: 'Address',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.string('city')

    t.nullable.field('country', {
      type: 'Country',
      resolve: (parent, _, ctx) => {
        return ctx.db.address.findUnique({
          where: { id: parent.id || undefined }
        }).Country()
      },
    })
    t.nullable.string('countryCode')

    t.nullable.field('county', {
      type: 'County',
      resolve(parent, _, ctx) {
        return ctx.db.address.findUnique({ where: { id: parent.id } }).County()
      },
    })
    t.nullable.string('countyCode')

    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nullable.float('lat')
    t.nullable.string('lineOne')
    t.nullable.string('lineTwo')
    t.nullable.float('lng')

    t.nullable.field('place', {
      type: 'Place',
      resolve(parent, _, ctx) {
        return ctx.db.address.findUnique({ where: { id: parent.id } }).Place()
      },
    })
    t.nullable.field('state', {
      type: 'State',
      resolve(parent, _, ctx) {
        return ctx.db.address.findUnique({ where: { id: parent.id } }).State()
      },
    })

    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nullable.string('zip')
  },
})
