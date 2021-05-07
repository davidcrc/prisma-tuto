import { objectType } from 'nexus'
import { findAttachment } from '../utils'

export const LeasableUnit = objectType({
  name: 'LeasableUnit',
  definition(t) {
    t.nullable.field('address', {
      type: 'Address',
    })
    t.nullable.string('businessKey')
    t.nullable.boolean('isInPortfolio')
    t.nullable.int('occupancyStatus')
    t.nullable.float('monthlyCost')
    t.nullable.int('squareFeet')
    t.nullable.boolean('squareFeetIsEstimate')
    t.nullable.float('squareFootCost')
    t.nullable.float('totalRent')
    t.nullable.float('baseRent')
    t.nullable.float('nnnRent')
    t.nullable.boolean('hasGreaseTrap')
    t.nullable.boolean('hasDockDoor')
    t.nullable.boolean('hasDriveThru')
    t.nullable.int('ceilingHeightInches')
    t.nullable.string('name')
    t.nonNull.int('id')
    t.nullable.string('renderUrl')
    t.nullable.string('externalNotes')
    t.nullable.field('productType', {
      type: 'ProductType',
    })
    t.nullable.field('leasableUnitSubType', {
      type: 'LeasableUnitSubType',
    })
    t.nullable.field('organization', {
      type: 'Organization',
    })
    // TODO: Args
    t.nullable.list.field('agents', {
      type: 'Agent',
      args: {},
    })

    t.nullable.field('dateAvailable', {
      type: 'DateTime',
    })
    t.nonNull.boolean('isListed')
    t.nullable.string('description')

    t.field('image', {
      type: 'String',
      resolve: async (parent, args, ctx) => {
        return await findAttachment(ctx, parent.id, 'image', 'LeasableUnit')
      },
    })

    t.field('plan', {
      type: 'String',
      resolve: async (parent, args, ctx) => {
        return await findAttachment(ctx, parent.id, 'plan', 'LeasableUnit')
      },
    })

    t.field('flyer', {
      type: 'String',
      resolve: async (parent, args, ctx) => {
        return await findAttachment(ctx, parent.id, 'flyer', 'LeasableUnit')
      },
    })
  },
})
