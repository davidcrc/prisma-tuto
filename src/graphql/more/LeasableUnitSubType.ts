import { objectType } from 'nexus'

export const LeasableUnitSubType = objectType({
  name: 'LeasableUnitSubType',
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
      resolve(parent, _, ctx) {
        return ctx.db.leasableUnitSubType.findUnique({ where: { id: parent.id } }).LeasableUnit()
      },
    })
    t.field('leasableUnitType', { 
      type: 'LeasableUnitType',
      resolve(parent, _, ctx) {
        return ctx.db.leasableUnitSubType.findUnique({ where: { id: parent.id } }).LeasableUnitType()
      },
    })
    t.string('name')
    t.nonNull.field('updatedAt', { type: 'DateTime' })
  },
})
