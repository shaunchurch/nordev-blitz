import React from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createProduct from "app/products/mutations/createProduct"
import ProductForm from "app/products/components/ProductForm"

const NewProductPage: BlitzPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)

  return (
    <div>
      <h1>Create New Product</h1>

      <ProductForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const product = await createProductMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(product))
            router.push("/products/[productId]", `/products/${product.id}`)
          } catch (error) {
            alert("Error creating product " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/products">
          <a>Products</a>
        </Link>
      </p>
    </div>
  )
}

NewProductPage.getLayout = (page) => <Layout title={"Create New Product"}>{page}</Layout>

export default NewProductPage
