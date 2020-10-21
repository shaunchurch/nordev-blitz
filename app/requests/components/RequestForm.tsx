import React from "react"
import LabeledTextField from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"

type RequestFormProps = {
  initialValues: any
  onSubmit: (values: any) => void
}

const RequestForm = ({ initialValues, onSubmit }: RequestFormProps) => {
  return (
    <Form
      submitText="Add request"
      // schema={LoginInput}
      initialValues={{ title: "" }}
      onSubmit={async (values) => {
        try {
          onSubmit(values)
        } catch (error) {
          if (error.name === "AuthenticationError") {
            return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
          } else {
            return {
              [FORM_ERROR]:
                "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
            }
          }
        }
      }}
    >
      <LabeledTextField name="title" label="Title" placeholder="Title" />
    </Form>
  )
}

export default RequestForm
