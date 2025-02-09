import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import BasicFieldHeader from "@/app/util/components/forms/basicfieldheader";
import ErrorStyling from "@/app/util/components/forms/errorstyling";

import { ProfileContext } from "@/app/context/AuthContext";
import { BASE_URL } from "@/app/util/constants";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

import { JourneyPageEnum, JourneyType } from "./journey";
import { EventDataContext } from "../../[id]/page";
import { storeISO } from "@/app/util/time";

export default function JourneyForm({ eventId, changePage }) {
  const eventData = useContext(EventDataContext);

  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const URL = `${BASE_URL}/event/journey/point/create/`;

  const JourneyPointSchema = Yup.object().shape({
    title: Yup.string()
      .required("Required")
      .min(6, "Must be at least 6 characters long"),
    location: Yup.string(),
    start_date: Yup.string(),
    end_date: Yup.string(),
  });

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          location: "",
          start_date: "",
          end_date: "",
          event_description: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={JourneyPointSchema}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          try {
            let formData = new FormData();
            formData.append("event", eventId);
            formData.append("type", JourneyType.POINT);
            formData.append("title", values.title);
            formData.append("location", values.location);
            formData.append("start_date", storeISO(values.start_date));
            formData.append("end_date", storeISO(values.end_date));

            await axios
              .post(URL, formData, config)
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }
          eventData.getJourney();
          changePage(JourneyPageEnum.LIST);
        }}
      >
        <Form className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h1 className="mb-2 text-2xl font-medium">Create Event</h1>
          </div>
          <BasicFieldHeader>
            <label htmlFor="title" className="text-medium font-medium">
              Title
            </label>
            <ErrorStyling>
              <ErrorMessage name="title" />
            </ErrorStyling>
          </BasicFieldHeader>

          <Field
            id="title"
            name="title"
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
            <label htmlFor="start_date" className="text-medium font-medium">
              Start Date
            </label>
            <ErrorStyling>
              <ErrorMessage name="start_date" />
            </ErrorStyling>
          </BasicFieldHeader>

          <Field
            id="start_date"
            name="start_date"
            type="datetime-local"
            className="h-10 w-80 rounded-sm bg-gray-200 px-2"
          />

          <BasicFieldHeader>
            <label htmlFor="end_date" className="text-medium font-medium">
              End Date
            </label>
            <ErrorStyling>
              <ErrorMessage name="end_date" />
            </ErrorStyling>
          </BasicFieldHeader>

          <Field
            id="end_date"
            name="end_date"
            type="datetime-local"
            className="h-10 w-80 rounded-sm bg-gray-200 px-2"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="mt-3 h-10 w-1/2 rounded-md bg-green-600 p-2 text-center text-white"
            >
              Submit
            </button>
            <button
              type="submit"
              className="mt-3 h-10 w-1/2 rounded-md bg-green-600 p-2 text-center text-white"
              onClick={() => {
                changePage(JourneyPageEnum.LIST);
              }}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
