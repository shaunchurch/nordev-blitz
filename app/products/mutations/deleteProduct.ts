import { Ctx } from "blitz"
import db, { ProductDeleteArgs } from "db"

type DeleteProductInput = Pick<ProductDeleteArgs, "where">

export default async function deleteProduct({ where }: DeleteProductInput, ctx: Ctx) {
  ctx.session.authorize()

  const product = await db.product.delete({ where })

  return product
}
