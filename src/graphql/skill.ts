import { extendType, inputObjectType, intArg, nonNull, objectType, stringArg } from "nexus";

export const SkillInputType = inputObjectType({
  name: 'SkillInputType',
  definition(t) {
    t.int('id')
  }
})

export const Skill = objectType({
  name: 'Skill',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.field('role', {
      type: 'Role',
      resolve: (parent, _, ctx) => {
        console.log('El parent', parent);
        return ctx.db.skill.findUnique({          
          where: { id: parent.id || undefined }
        }).role()
      }
    })
  }
})

export const SkillQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all skills
    t.list.field('skills', {
      type: 'Skill',
      resolve(_root, _args, ctx) {
        return ctx.db.skill.findMany()
      }
    })
    // get skill by id
    t.field('skill', {
      type: 'Skill',
      args: {
        id: nonNull(intArg())
      },
      resolve(_root, args, ctx) {
        return ctx.db.skill.findUnique({
          where: { id: args.id }
        })
      }
    })
  }
})

export const SkillMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a new skill
    t.field('createSkill', {
      type: 'Skill',
      args: {
        name: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.skill.create({
          data: {
            name: args.name,
          }
        })
      }
    })
    // update a skill by id
    t.field('updateSkill', {
      type: 'Skill',
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.db.skill.update({
          where: { id: args.id },
          data: {
            name: args.name,
          }
        })
      }
    })
    // delete a skill by id
    t.field('deleteSkill', {
      type: 'Skill',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.skill.delete({
          where: { id: args.id }
        })
      }
    })
  }
})