import { arg, list, extendType, inputObjectType, intArg, nonNull, objectType, stringArg } from "nexus";


const RoleInputType = inputObjectType({
  name: 'RoleInputType',
  definition(t) {
    t.int('id')
  }
})

const Role = objectType({
  name: 'Role',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.field('company', {
      type: 'Company',
      resolve: (parent, _, ctx) => {
        return ctx.db.role.findUnique({
          where: { id: parent.id || undefined }
        }).company()
      }
    })
    t.list.field('skills', {
      type: 'Skill',
      resolve: (parent, _, ctx) => {
        return ctx.db.role.findUnique({
          where: { id: parent.id || undefined }
        }).skills()
      }
    })
  }
})

const RoleMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a new role
    t.field('createRole', {
      type: 'Role',
      args: {
        name: nonNull(stringArg()),
        skillId: intArg(),
        skills: arg({
          type: list('SkillInputType')
        })
      },
      resolve(_root, args, ctx) {
        return ctx.db.role.create({
          data: {
            name: args.name,
            skills: {
              connect: [
                { id: args.skillId || undefined }
              ]
            }
          }
        })
      }
    })
    // update a role by id
    t.field('updateRole', {
      type: 'Role',
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        skillId: intArg(),
        skills: arg({
          type: list('SkillInputType')
        })
      },
      resolve(_root, args, ctx) {
        return ctx.db.role.update({
          where: { id: args.id },
          data: {
            name: args.name,
            skills: {
              connect: [
                { id: args.skillId || undefined }
              ]
            }
          }
        })
      }
    })
    // delete a role by id
    t.field('deleteRole', {
      type: 'Role',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.role.delete({
          where: { id: args.id }
        })
      }
    })
  }
})