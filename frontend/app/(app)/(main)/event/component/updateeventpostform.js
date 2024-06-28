import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useEffect, useState } from "react";
import api from "@/app/util/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, BASE_URL } from "@/app/util/constants";
import { EventDataContext } from "../[id]/page";
import { ProfileContext } from "@/app/context/AuthContext";

export default function UpdateEventPostForm({
  eventPostId,
  type,
  text,
  image,
}) {
  useEffect(() => {
    setPreviewImage(image);
  }, []);

  const eventData = useContext(EventDataContext);
  const profileData = useContext(ProfileContext);

  const [postImage, setPostImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = (e) => {
    if ([e.target.name] == "postImage") {
      setPostImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const updateEventURL = `${BASE_URL}/event/event-post/update/${eventPostId}/`;
  const updateMemoriesURL = `${BASE_URL}/event/memories-post/update/${eventPostId}/`;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-medium">
        {type == "event-post" ? "Edit Chat" : "Edit Memories"}
      </h1>
      <Formik
        initialValues={{
          message: text,
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          try {
            let formData = new FormData();
            formData.append("user", profileData.id);
            formData.append("message", values.message);
            if (postImage != "") formData.append("image", postImage);
            await axios
              .put(
                type == "event-post" ? updateEventURL : updateMemoriesURL,
                formData,
                config,
              )
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }
          eventData.getLists();
          eventData.setUpdateEventPostModal(false);
        }}
      >
        <Form className="flex flex-col gap-1">
          <label
            htmlFor="postImage"
            className={`h-80 w-80 rounded-md bg-gray-200`}
          >
            <h1
              className={`flex h-full w-full items-center justify-center ${
                previewImage == null ? "" : "hidden"
              }`}
            >
              Add Image
            </h1>
            <img
              className={`h-full w-full rounded-md object-cover ${
                previewImage == null ? "hidden" : ""
              } `}
              src={previewImage}
            />
          </label>
          <Field
            id="postImage"
            name="postImage"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
          <ErrorMessage name="postImage" />

          <label htmlFor="message" className="text-medium font-medium">
            Message
          </label>
          <Field
            id="message"
            name="message"
            autoComplete="off"
            type="text"
            className="h-10 w-80 rounded-sm bg-gray-200 px-2"
          />
          <ErrorMessage name="message" />

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
