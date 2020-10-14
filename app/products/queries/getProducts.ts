import { Ctx } from "blitz"
import db, { FindManyProductArgs } from "db"

type GetProductsInput = Pick<FindManyProductArgs, "where" | "orderBy" | "skip" | "take">

export default async function getProducts(
  { where, orderBy, skip = 0, take }: GetProductsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const products = await db.product.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.product.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    products,
    nextPage,
    hasMore,
    count,
  }
}
