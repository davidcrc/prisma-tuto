import { objectType } from 'nexus'
import * as tipo from "@prisma/client"

export const Address = objectType({
  name: 'Address',
  definition(t) {
    t.nullable.string('city')

    t.nullable.field('country', {
      type: 'Country',
    })
    // t.nullable.string('countryCode')

    // t.nullable.field('county', {
    //   type: 'County',
    // })
    t.nullable.string('countyCode')

    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nullable.float('lat')
    t.nullable.string('lineOne')
    t.nullable.string('lineTwo')
    t.nullable.float('lng')

    // t.nullable.field('place', {
    //   type: 'Place',
    // })
    // t.nullable.field('state', {
    //   type: 'State',
    // })

    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nullable.string('zip')
  },
})
