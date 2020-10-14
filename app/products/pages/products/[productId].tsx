import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getProduct from "app/products/queries/getProduct"
import deleteProduct from "app/products/mutations/deleteProduct"

export const Product = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product] = useQuery(getProduct, { where: { id: productId } })
  const [deleteProductMutation] = useMutation(deleteProduct)

  return (
    <div>
      <h1>Product {product.id}</h1>
      <pre>{JSON.stringify(product, null, 2)}</pre>

      <Link href="/products/[productId]/edit" as={`/products/${product.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteProductMutation({ where: { id: product.id } })
            router.push("/products")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowProductPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/products">
          <a>Products</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </div>
  )
}

ShowProductPage.getLayout = (page) => <Layout title={"Product"}>{page}</Layout>

export default ShowProductPage
