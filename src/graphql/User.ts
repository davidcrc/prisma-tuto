import { objectType } from 'nexus'
import { findAttachment } from '../Utils'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nullable.string('firstName')
    t.nullable.string('lastName')
    t.nonNull.string('email')
    t.nullable.string('alternateEmail')
    t.nullable.string('officePhone')
    t.nullable.string('primaryCellPhone')
    t.nullable.string('alternateCellPhone')

    //
    t.nullable.field('organization', {
      type: 'Organization',
      resolve(parent, _, ctx) {
        return ctx.db.user.findUnique({ where: { id: parent.id } }).Organization()
      },
    })

    t.nullable.boolean('isBroker')
    t.nullable.int('signInCount')
    t.nullable.field('currentSignInAt', {
      type: 'DateTime',
    })
    t.nullable.field('acceptedDisclaimerAt', {
      type: 'DateTime',
    })
    t.nullable.int('personType')
    t.nullable.int('accountType')

    t.field('picture', {
      type: 'String',
      resolve: async (parent, args, ctx) => {
        return await findAttachment(ctx, parent.id, 'photo', 'User')
      },
    })
  },
})
