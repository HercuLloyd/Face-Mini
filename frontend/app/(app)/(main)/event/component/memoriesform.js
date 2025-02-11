import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";

import { EventDataContext } from "../[id]/page";
import { ProfileContext } from "@/app/context/AuthContext";
import { BASE_URL } from "@/app/util/constants";
import ErrorStyling from "@/app/util/components/forms/errorstyling";

export default function MemoriesForm({ eventId }) {
  const eventData = useContext(EventDataContext);
  const profileData = useContext(ProfileContext);

  const [postImage, setPostImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = (e) => {
    if ([e.target.name] == "memImage") {
      setPostImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const axiosURL = `${BASE_URL}/event/memories-post/`;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-medium">Memory</h1>
      <Formik
        initialValues={{
          message: "",
        }}
        validateOnChange={false}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          try {
            let formData = new FormData();
            formData.append("user", profileData.id);
            formData.append("message", values.message);
            formData.append("image", postImage);
            formData.append("event", eventId);
            await axios
              .post(axiosURL, formData, config)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }
          eventData.getLists();
          eventData.setMemoriesModal(false);
          setPostImage("");
          setPreviewImage("");
          values.message = "";
        }}
      >
        <Form className="flex flex-col gap-1">
          <label
            htmlFor="memImage"
            className={`h-80 w-80 rounded-md bg-gray-200`}
          >
            <h1
              className={`flex h-full w-full items-center justify-center ${
                previewImage == "" ? "" : "hidden"
              }`}
            >
              Add Image
            </h1>
            <img
              className={`h-full w-full rounded-md object-cover ${
                previewImage == "" ? "hidden" : ""
              } `}
              src={previewImage}
            />
          </label>
          <Field
            id="memImage"
            name="memImage"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
          <ErrorMessage name="memImage" />

          <label htmlFor="message" className="text-medium font-medium">
            Description
          </label>

          <ErrorStyling>
            <ErrorMessage name="message" />
          </ErrorStyling>

          <Field
            id="message"
            name="message"
            autoComplete="off"
            type="text"
            className="h-10 w-80 rounded-sm bg-gray-200 px-2"
          />

          <button
            type="submit"
            className="mt-3 h-10 w-80 rounded-md bg-green-600 p-2 text-center text-white"
          >
            Share
          </button>
        </Form>
      </Formik>
    </div>
  );
}
