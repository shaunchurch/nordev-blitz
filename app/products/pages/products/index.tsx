import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getProducts from "app/products/queries/getProducts"

const ITEMS_PER_PAGE = 100

export const ProductsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href="/products/[productId]" as={`/products/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ProductsPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/products/new">
          <a>Create Product</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductsList />
      </Suspense>
    </div>
  )
}

ProductsPage.getLayout = (page) => <Layout title={"Products"}>{page}</Layout>

export default ProductsPage
