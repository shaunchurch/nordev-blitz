import { ReactNode } from "react"
import { Head } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "nordev-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-screen-lg mx-auto">{children}</div>
    </>
  )
}

export default Layout
