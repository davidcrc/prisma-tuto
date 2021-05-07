import { objectType } from 'nexus'

import { findAttachment } from '../utils'

export const Organization = objectType({
  name: 'Organization',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.field('address', {
      type: 'Address',
    })
    t.nullable.string('name')
    t.nullable.string('stateAffiliation')
    t.nullable.string('fein')
    t.nullable.string('stateBusinessEntityNumber')
    t.nullable.string('registeredAgent')
    t.nullable.string('dAndBNumber')
    t.nullable.string('stockTicker')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nullable.boolean('isActive')
    t.nullable.string('mainPhone')
    t.nullable.boolean('isBrokerage')
    t.nullable.string('website')
    t.nullable.string('notes')
    t.nullable.string('industryCategory')
    t.nullable.string('generalRequirements')

    // TODO: args
    t.nullable.int('siteRequirement')
    t.nullable.int('unitRequirement')
    t.nullable.int('demographicRequirement')
    t.nullable.int('leaseRequirement')
    t.nullable.field('leasableUnit', {
      type: 'LeasableUnit',
    })

    t.field('logo', {
      type: 'String',
      resolve: async (parent, args, ctx) => {
        return await findAttachment(ctx, parent.id, 'logo', 'Organization')
      },
    })
  },
})
