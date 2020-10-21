import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getRequest from "app/requests/queries/getRequest"
import updateRequest from "app/requests/mutations/updateRequest"
import RequestForm from "app/requests/components/RequestForm"

export const EditRequest = () => {
  const router = useRouter()
  const requestId = useParam("requestId", "number")
  const [request, { mutate }] = useQuery(getRequest, { where: { id: requestId } })
  const [updateRequestMutation] = useMutation(updateRequest)

  return (
    <div>
      <h1>Edit Request {request.id}</h1>
      <pre>{JSON.stringify(request)}</pre>

      <RequestForm
        initialValues={request}
        onSubmit={async () => {
          try {
            const updated = await updateRequestMutation({
              where: { id: request.id },
              data: { name: "MyNewName" },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/requests/[requestId]", `/requests/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating request " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditRequestPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRequest />
      </Suspense>

      <p>
        <Link href="/requests">
          <a>Requests</a>
        </Link>
      </p>
    </div>
  )
}

EditRequestPage.getLayout = (page) => <Layout title={"Edit Request"}>{page}</Layout>

export default EditRequestPage
