import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import BasicFieldHeader from "@/app/util/components/forms/basicfieldheader";
import ErrorStyling from "@/app/util/components/forms/errorstyling";
import { ExploreDataContext } from "../page";
import { ProfileContext } from "@/app/context/AuthContext";
import { BASE_URL } from "@/app/util/constants";

export default function EventForm({ onClose }) {
  const exploreData = useContext(ExploreDataContext);
  const profileData = useContext(ProfileContext);

  const [postImage, setPostImage] = useState("");

  const handleChange = (e) => {
    if ([e.target.name] == "coverImage") {
      setPostImage(e.target.files[0]);
    }
  };

  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const URL = `${BASE_URL}/event/post/`;

  const EventPostSchema = Yup.object().shape({
    event_title: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters long"),
    location: Yup.string().required("Required"),
    time: Yup.string().required("Required"),
    event_description: Yup.string().required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          event_title: "",
          location: "",
          time: "",
          event_description: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={EventPostSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          try {
            console.log(postImage);
            let formData = new FormData();
            formData.append("host", profileData.id);
            formData.append("event_title", values.event_title);
            formData.append("location", values.location);
            formData.append("time", values.time);
            formData.append("event_description", values.event_description);
            formData.append("image", postImage);

            await axios
              .post(URL, formData, config)
              .then((res) => {
                console.log(res.data);
                onClose();
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }
          exploreData.getEventList();
        }}
      >
        <Form className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h1 className="mb-2 text-2xl font-medium">Create Event</h1>
            <label
              htmlFor="coverImage"
              className="flex h-10 w-10 items-center justify-center rounded-sm bg-green-600 text-xl text-white"
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
          </div>
          <BasicFieldHeader>
            <label htmlFor="event_title" className="text-medium font-medium">
              Title
            </label>
            <ErrorStyling>
              <ErrorMessage name="event_title" />
            </ErrorStyling>
          </BasicFieldHeader>

          <Field
            id="event_title"
            name="event_title"
            type="text"
            className="h-10 w-80 rounded-sm bg-gray-200 px-2"
          />

          <BasicFieldHeader>
            <label htmlFor="location" className="text-medium font-medium">
              Location
            </label>
            <ErrorStyling>
              <ErrorMessage name="location" />
            </ErrorStyling>
          </BasicFieldHeader>

          <Field
            id="location"
            name="location"
            type="text"
            className="h-10 w-80 rounded-sm bg-gray-200 px-2"
          />

          <BasicFieldHeader>
            <label htmlFor="time" className="text-medium font-medium">
              Time & Date
            </label>
            <ErrorStyling>
              <ErrorMessage name="time" />
            </ErrorStyling>
          </BasicFieldHeader>

          <Field
            id="time"
            name="time"
            type="datetime-local"
            className="h-10 w-80 rounded-sm bg-gray-200 px-2"
          />

          <BasicFieldHeader>
            <label
              htmlFor="event_description"
              className="text-medium font-medium"
            >
              Description
            </label>
            <ErrorStyling>
              <ErrorMessage name="event_description" />
            </ErrorStyling>
          </BasicFieldHeader>

          <Field
            id="event_description"
            name="event_description"
            type="text"
            component="textarea"
            className="h-24 w-80 resize-none rounded-sm bg-gray-200 p-2 px-2"
          />

          <button
            type="submit"
            className="mt-3 h-10 w-80 rounded-md bg-green-600 p-2 text-center text-white"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
