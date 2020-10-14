import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getProduct from "app/products/queries/getProduct"
import updateProduct from "app/products/mutations/updateProduct"
import ProductForm from "app/products/components/ProductForm"

export const EditProduct = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product, { mutate }] = useQuery(getProduct, { where: { id: productId } })
  const [updateProductMutation] = useMutation(updateProduct)

  return (
    <div>
      <h1>Edit Product {product.id}</h1>
      <pre>{JSON.stringify(product)}</pre>

      <ProductForm
        initialValues={product}
        onSubmit={async () => {
          try {
            const updated = await updateProductMutation({
              where: { id: product.id },
              data: { name: "MyNewName" },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/products/[productId]", `/products/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating product " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditProductPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProduct />
      </Suspense>

      <p>
        <Link href="/products">
          <a>Products</a>
        </Link>
      </p>
    </div>
  )
}

EditProductPage.getLayout = (page) => <Layout title={"Edit Product"}>{page}</Layout>

export default EditProductPage
