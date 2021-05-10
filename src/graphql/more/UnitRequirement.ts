import { objectType } from 'nexus'

export const UnitRequirement = objectType({
  name: "UnitRequirement",
  definition(t) {
    t.nonNull.int("id")
    t.string("culinaryWaterRequirements")
    t.string("dockDoorRequirements")
    t.boolean("driveThru")
    t.string("driveThruDetails")
    t.float("greaseTrapSize")
    t.float("hvacTons")
    t.float("minCeilingHeightFt")
    t.float("minFrontageFt")
    t.string("naturalGasFuelRequirements")
    t.list.nonNull.field("organizations", {
      type: 'Organization',
      args: {
        // where: arg({ type: OrganizationWhereInput }),
        // orderBy: arg({ type: OrganizationOrderByInput }),
        // skip: intArg(),
        // after: stringArg(),
        // before: stringArg(),
        // first: intArg(),
        // last: intArg(),
      },
    })
    t.int("powerServiceAmps")
    t.int("powerServicePhase")
    t.string("sanitarySewerRequirement")
    t.int("sfAvg")
    t.int("sfMax")
    t.int("sfMin")
    t.int("unitType")
  }
})