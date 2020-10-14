import { Ctx } from "blitz"
import db, { ProductCreateArgs } from "db"

type CreateProductInput = Pick<ProductCreateArgs, "data">
export default async function createProduct({ data }: CreateProductInput, ctx: Ctx) {
  ctx.session.authorize()

  const product = await db.product.create({ data })

  return product
}
