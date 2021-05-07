import { verify } from 'jsonwebtoken'
import { Context } from './context';

export const APP_SECRET = 'es-graphql-api-XYU1'

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  try {
    const Authorization = context.request.get('Authorization')
    if (!Authorization) {
      throw new Error('Not authorized')
    }

    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token

    return verifiedToken && verifiedToken.userId
  } catch (error) {
    throw new Error('Not authorized')
  }
}