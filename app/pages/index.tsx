import { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"
import UserInfo from "app/auth/components/UserInfo"

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
