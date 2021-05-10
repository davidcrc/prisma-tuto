import { arg, extendType, intArg, list, nonNull, objectType, stringArg } from 'nexus';
import { sign } from 'jsonwebtoken'
import { compare, hash } from 'bcrypt';
import { APP_SECRET, getUserId } from '../Utils'

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