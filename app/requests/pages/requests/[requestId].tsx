import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getRequest from "app/requests/queries/getRequest"
import deleteRequest from "app/requests/mutations/deleteRequest"

export const Request = () => {
  const router = useRouter()
  const requestId = useParam("requestId", "number")
  const [request] = useQuery(getRequest, { where: { id: requestId } })
  const [deleteRequestMutation] = useMutation(deleteRequest)

  return (
    <div>
      <h1>Request {request.id}</h1>
      <pre>{JSON.stringify(request, null, 2)}</pre>

      <Link href="/requests/[requestId]/edit" as={`/requests/${request.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteRequestMutation({ where: { id: request.id } })
            router.push("/requests")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowRequestPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/requests">
          <a>Requests</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Request />
      </Suspense>
    </div>
  )
}

ShowRequestPage.getLayout = (page) => <Layout title={"Request"}>{page}</Layout>

export default ShowRequestPage
