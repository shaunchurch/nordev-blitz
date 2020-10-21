import { Ctx } from "blitz"
import db, { VotesOnRequestsCreateArgs } from "db"

type VotesOnRequestsInput = Pick<VotesOnRequestsCreateArgs, "data">

export default async function voteOnRequest({ data }: VotesOnRequestsInput, ctx: Ctx) {
  ctx.session.authorize()
  const userId = ctx.session.userId

  const request = await db.votesOnRequests.create({
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
