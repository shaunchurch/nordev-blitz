import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getProduct from "app/products/queries/getProduct"
import deleteProduct from "app/products/mutations/deleteProduct"

export const Product = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product] = useQuery(getProduct, { where: { id: productId || 1 } })
  const [deleteProductMutation] = useMutation(deleteProduct)

  return (
    <div>
      <h1>Product {product.id}</h1>

      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
      <header className="flex flex-row mb-4 items-center">
        <h2 className="text-base uppercase tracking-wider leading-tight font-semibold text-gray-600">
          Feature Requests
        </h2>
        <span className="ml-auto">
          <Link href="/requests/new">
            <a className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white font-bold">
              New request
            </a>
          </Link>
        </span>
      </header>
      <ul className="space-y-4 p-4 bg-gray-200 rounded">
        {product.requests.map((request) => {
          return (
            <li className="p-4 shadow rounded flex flex-row space-x-4 bg-white">
              <div className="border rounded">
                <button className="flex flex-col space-y-4 p-3 rounded shadow-sm hover:bg-yellow-200">
                  <span>123</span> <span>Vote</span>
                </button>
              </div>
              <div className="flex flex-col">
                <span className="text-xl">{request.title}</span>
                <span className="text-xl">{request.description}</span>
              </div>
            </li>
          )
        })}
      </ul>

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
