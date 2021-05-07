import { objectType } from 'nexus'

export const LeasableUnitType = objectType({
  name: 'LeasableUnitType',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    //   TODO:
    t.list.nonNull.field('leasableUnits', {
      type: 'LeasableUnit',
      // args: {
      //   where: arg({ type: LeasableUnitWhereInput }),
      //   orderBy: arg({ type: LeasableUnitOrderByInput }),
      //   skip: intArg(),
      //   after: stringArg(),
      //   before: stringArg(),
      //   first: intArg(),
      //   last: intArg(),
      // },
    })

    //   TODO:
    t.list.nonNull.field('leasableUnitSubTypes', {
      type: 'LeasableUnitSubType',
      // args: {
      //   where: arg({ type: LeasableUnitSubTypeWhereInput }),
      //   orderBy: arg({ type: LeasableUnitSubTypeOrderByInput }),
      //   skip: intArg(),
      //   after: stringArg(),
      //   before: stringArg(),
      //   first: intArg(),
      //   last: intArg(),
      // },
    })
    t.string('name')
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
