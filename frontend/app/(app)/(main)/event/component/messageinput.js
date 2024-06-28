import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useState } from "react";
import api from "@/app/util/api";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, BASE_URL } from "@/app/util/constants";
import axios from "axios";
import { EventDataContext } from "../[id]/page";
import { ProfileContext } from "@/app/context/AuthContext";

export default function MessageInput({ tab, event }) {
  const eventData = useContext(EventDataContext);
  const profileData = useContext(ProfileContext);

  const [postImage, setPostImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = (e) => {
    if ([e.target.name] == "coverImage") {
      setPostImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
    console.log(postImage);
  };

  const refreshData = () => {
    window.location.reload(false);
  };

  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const axiosURL = `${BASE_URL}/event/create-event-post/`;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 flex justify-center pl-[240px] ${
        tab != "chat" ? "hidden" : ""
      }`}
    >
      <Formik
        initialValues={{
          message: "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          try {
            let formData = new FormData();
            formData.append("user", profileData.id);
            formData.append("message", values.message);
            formData.append("event", event);
            formData.append("image", postImage);

            await axios
              .post(axiosURL, formData, config)
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }
          setPreviewImage("");
          eventData.getLists();
          values.message = "";
          setPostImage("");
        }}
      >
        <Form className="h-full bg-white pb-2">
          <div
            className={`flex w-full justify-end py-2 ${
              previewImage == "" ? "hidden" : ""
            }`}
          >
            <img
              src={previewImage}
              className={`h-32 w-32 rounded-md object-cover`}
            />
          </div>

          <div className="flex w-96 items-center justify-center gap-2 rounded-md border-2 border-slate-500 bg-white p-1">
            <Field
              id="message"
              name="message"
              autoComplete="off"
              type="text"
              className="h-full w-80 rounded-sm px-2 outline-none"
            />
            <ErrorMessage name="message" />

            <label
              htmlFor="coverImage"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-red-600 text-xl text-white`}
            >
              #
            </label>
            <Field
              id="coverImage"
              name="coverImage"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
            <ErrorMessage name="coverImage" />

            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-green-600 p-2 text-center text-xl text-white"
            >
              #
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
