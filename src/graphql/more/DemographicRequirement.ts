import { objectType } from 'nexus'

export const DemographicRequirement = objectType({
  name: 'DemographicRequirement',
  definition(t) {
    t.nonNull.int('id')
    t.string('ageRange')
    t.int('avgHouseholdIncome')
    t.int('daytimeEmployeesCount')
    t.float('daytimeEmployeesRadiusMiles')
    t.float('householdCountRadiusMiles')
    t.int('houselholdCount')
    //   TODO:
    t.list.nonNull.field('organizations', {
      type: 'Organization',
      args: {
      //   where: arg({ type: OrganizationWhereInput }),
      //   orderBy: arg({ type: OrganizationOrderByInput }),
      //   skip: intArg(),
      //   after: stringArg(),
      //   before: stringArg(),
      //   first: intArg(),
      //   last: intArg(),
      },
      resolve(parent, _, ctx) {
        return ctx.db.demographicRequirement.findUnique({ where: { id: parent.id } }).Organization()
      },
    })
    t.int('populationCount')
    t.float('populationCountRadiusMiles')
  },
})
