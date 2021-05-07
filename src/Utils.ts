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

export const findAttachment = async (
  context: Context,
  id: number,
  name: string,
  attachmentType: string,
) => {
  const attach = await context.db.activeStorageAttachment.findMany({
    where: {
      AND: [
        {
          name: name,
          record: id,
          recordType: attachmentType,
        },
      ],
    },
  })

  if (attach.length === 0) return null

  const { blob } = attach[0]

  const res = await context.db.activeStorageBlob.findMany({
    where: { id: blob },
  })
  const key = res

  return `https://dev-es-core.s3.us-east-2.amazonaws.com/${key}`
}