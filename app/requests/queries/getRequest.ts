import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstRequestArgs } from "db"

type GetRequestInput = Pick<FindFirstRequestArgs, "where">

export default async function getRequest({ where }: GetRequestInput, ctx: Ctx) {
  ctx.session.authorize()

  const request = await db.request.findFirst({ where })

  if (!request) throw new NotFoundError()

  return request
}
