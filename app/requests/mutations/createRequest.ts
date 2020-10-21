import { Ctx } from "blitz"
import db, { RequestCreateArgs } from "db"

type CreateRequestInput = Pick<RequestCreateArgs, "data">
export default async function createRequest({ data }: CreateRequestInput, ctx: Ctx) {
  ctx.session.authorize()
  const userId = ctx.session.userId

  const request = await db.request.create({
    data: {
      ...data,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  return request
}
