import { objectType } from 'nexus'

export const LeaseRequirement = objectType({
  name: 'LeaseRequirement',
  definition(t) {
    t.nonNull.int('id')
    t.string('exclusiveUseRequired')
    t.int('initialTermMonths')
    t.string('numberAndLenghtOfOptions')
    //   TODO:
    t.list.nonNull.field('organizations', {
      type: 'Organization',
      // args: {
      //   where: arg({ type: OrganizationWhereInput }),
      //   orderBy: arg({ type: OrganizationOrderByInput }),
      //   skip: intArg(),
      //   after: stringArg(),
      //   before: stringArg(),
      //   first: intArg(),
      //   last: intArg(),
      // },
    })
    t.string('signage')
    t.string('useExpression')
  },
})
