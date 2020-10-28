import { BlitzPage, Link, useQuery } from "blitz"
import Layout from "app/layouts/Layout"
import getProducts from "app/products/queries/getProducts"
import { Suspense } from "react"

const HomePage = () => {
  const [products] = useQuery(getProducts, {})
  console.log("products", products)

  return (
    <div className="">
      <div className="flex flex-col space-y-10 py-20 justify-center text-center">
        <p className="uppercase tracking-wider text-blue-600">Introducing...</p>
        <h1 className="text-6xl font-extrabold tracking-tighter">Simple user feedback.</h1>
        <p className="text-gray-800">Without happy users, you are nothing.</p>
        <Link href="/signup">
          <a className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white font-bold max-w-sm mx-auto">
            I want feedback
          </a>
        </Link>
      </div>
      <ul className="grid grid-cols-12">
        {products?.products?.map((product) => {
          return (
            <li key={product.id} className="border p-4 col-span-4">
              <h2 className="font-bold text-lg">{product.name}</h2>
              <Link href={`/products/${product.id}`}>
                <a className="text-blue-500 underline">View requests</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const Home: BlitzPage = () => {
  return (
    <Suspense fallback="Loading...">
      <HomePage />
    </Suspense>
  )
}

// Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
