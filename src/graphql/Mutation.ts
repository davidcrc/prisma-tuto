import { arg, extendType, intArg, list, nonNull, objectType, stringArg } from 'nexus';
import { sign } from 'jsonwebtoken'
import { compare, hash } from 'bcrypt';
import { APP_SECRET, getUserId } from '../Utils'

const CompanyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    // create a new company
    t.nonNull.field('createCompany', {
      type: 'Company',
      args: {
        id: intArg(),
        name: nonNull(stringArg()),
        contactPerson: nonNull(stringArg()),
        bio: nonNull(stringArg()),
        email: nonNull(stringArg()),
        website: nonNull(stringArg()),
        roleId: intArg(),
        // roles: arg({
        //   type: list('RoleInputType'),
        // }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.company.create({
          data: {
            name: args.name,
            contactPerson: args.contactPerson,
            bio: args.bio,
            email: args.email,
            website: args.website,
            roles: {
              connect: [{ id: args.roleId || undefined }],
            },
          },
        });
      },
    });
    // update a company by id
    t.field('updateCompany', {
      type: 'Company',
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
        contactPerson: stringArg(),
        bio: stringArg(),
        email: stringArg(),
        website: stringArg(),
        roleId: intArg(),
        // roles: arg({
        //   type: list('RoleInputType'),
        // }),
      },
      resolve(_root, args, ctx) {
        return ctx.db.company.update({
          where: { id: args.id },
          data: {
            name: args.name,
            contactPerson: args.contactPerson,
            bio: args.bio,
            email: args.email,
            website: args.website,
            roles: {
              connect: [{ id: args.roleId || undefined }],
            },
          },
        });
      },
    });
    // delete a company by id
    t.field('deleteCompany', {
      type: 'Company',
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.company.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

export const LogInMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
        password: stringArg(),
      },
      resolve: async (_, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.db.user.create({
          data: {
            firstName: name,
            email,
            encryptedPassword: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: stringArg(),
      },
      resolve: async (_, { email, password }, ctx) => {
        const user = await ctx.db.user.findUnique({
          where: { email: email },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.encryptedPassword)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('agreeDisclaimer', {
      type: 'User',
      args: {
        acceptedDisclaimerAt: arg({ type: 'DateTime' }),
      },
      resolve: async (_parent, { acceptedDisclaimerAt }, ctx) => {
        const userId = getUserId(ctx)
        const updatedUser = await ctx.db.user.update({
          data: {
            acceptedDisclaimerAt,
          },
          where: {
            id: Number(userId),
          },
        })

        return updatedUser
      },
    })
    
  },
});