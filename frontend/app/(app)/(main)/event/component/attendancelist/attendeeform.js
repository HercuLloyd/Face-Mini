import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "@/app/util/api";
export default function AttendeeForm({ id, extraInfo, setInfo, onClose }) {
  //get extra info
  //text input to edit extra info
  //submit input to update extra info
  return (
    <div>
      <Formik
        initialValues={{
          extra_info: extraInfo,
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          // setSubmitting(false);
          console.log(values.extra_info);
          await api.put(`/event/event-user/update/${id}/`, {
            extra_info: values.extra_info,
          });
          setInfo(values.extra_info);
        }}
      >
        <Form className="flex h-full flex-col bg-white pt-1">
          <Field
            id="extra_info"
            name="extra_info"
            autoComplete="off"
            type="text"
            component="textarea"
            className="h-14 w-80 resize-none rounded-sm border-2 border-gray-200 px-2 outline-none"
          />
          {/* <ErrorMessage name="extra_info" /> */}
          <button
            type="submit"
            className="mt-3 h-10 w-80 rounded-md bg-green-600 p-2 text-center text-white"
            onClick={() => {
              onClose();
            }}
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
