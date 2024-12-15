import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { BASE_URL } from "@/app/util/constants";

import axios from "axios";
import { EventDataContext } from "../[id]/page";
import { ProfileContext } from "@/app/context/AuthContext";

import ErrorStyling from "@/app/util/components/forms/errorstyling";

import SendIcon from "@mui/icons-material/Send";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Send } from "@mui/icons-material";

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

  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const axiosURL = `${BASE_URL}/event/create-event-post/`;

  const MessageSchema = Yup.object().shape({
    message: Yup.string().min(4, "Message must be at least 4 characters long"),
  });

  return (
    <div
      className={`fixed bottom-[48px] flex w-[calc(100%-16px)] justify-center bg-white md:bottom-0 ${
        tab != "chat" ? "hidden" : ""
      }`}
    >
      <Formik
        initialValues={{
          message: "",
        }}
        validateOnChange={false}
        validationSchema={MessageSchema}
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
        <Form className="h-full w-full pb-1 md:pb-4">
          <div
            className={`flex w-full py-2 ${previewImage == "" ? "hidden" : ""}`}
          >
            <img
              src={previewImage}
              className={`h-32 w-32 rounded-md object-cover`}
            />
          </div>

          <ErrorStyling>
            <ErrorMessage name="message" />
          </ErrorStyling>

          <div className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-slate-500 bg-white p-1 sm:w-96">
            <Field
              id="message"
              name="message"
              autoComplete="off"
              type="text"
              className="h-full w-full rounded-sm px-1 outline-none"
            />

            <label
              htmlFor="coverImage"
              className={`flex shrink-0 items-center justify-center rounded-md p-1 text-xl hover:bg-gray-300`}
            >
              <InsertPhotoIcon sx={{ color: "#1BB12C" }} fontSize="large" />
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
              <Send color="white" fontSize="medium" />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
