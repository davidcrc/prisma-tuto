import { objectType } from 'nexus'

import { findAttachment } from '../utils'

export const Organization = objectType({
  name: 'Organization',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.field('address', {
      type: 'Address',
      resolve(parent, _, ctx) {
        return ctx.db.organization.findUnique({ where: { id: parent.id } }).Address()
      },
    })
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nullable.string('dAndBNumber')
    t.nullable.string('fein')
    t.nullable.string('name')
    t.nullable.string('website')
    t.nullable.string('notes')
    t.nullable.boolean('isActive')
    t.nullable.string('industryCategory')
    t.nullable.string('generalRequirements')
    t.nullable.field('siteRequirement', {
      type: 'SiteRequirement',
      resolve(parent, _, ctx) {
        return ctx.db.organization.findUnique({ where: { id: parent.id } }).SiteRequirement()
      },
    })
    t.nullable.int('unitRequirement', {
      type: 'UnitRequirement',
      resolve(parent, _, ctx) {
        return ctx.db.organization.findUnique({ where: { id: parent.id } }).UnitRequirement()
      },
    })
    t.nullable.field('demographicRequirement',{
      type: 'DemographicRequirement',
      resolve(parent, _, ctx) {
        return ctx.db.organization.findUnique({ where: { id: parent.id } }).DemographicRequirement()
      },
    })
    t.nullable.field('leaseRequirement', {
      type: 'LeaseRequirement',
      resolve(parent, _, ctx) {
        return ctx.db.organization.findUnique({ where: { id: parent.id } }).LeaseRequirement()
      },
    })
    t.nullable.boolean('isBrokerage')    
    t.nullable.string('registeredAgent')
    t.nullable.string('stateAffiliation')
    t.nullable.string('stateBusinessEntityNumber')
    t.nullable.string('stockTicker')
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
    t.nullable.list.nonNull.field('leasableUnit', {
      type: 'LeasableUnit',
      resolve(parent, _, ctx) {
        return ctx.db.organization.findUnique({ where: { id: parent.id } }).LeasableUnit()
      },
    })
    t.nullable.string('mainPhone')
    t.field('logo', {
      type: 'String',
      resolve: async (parent, args, ctx) => {
        return await findAttachment(ctx, parent.id, 'logo', 'Organization')
      },
    })
  },
})
