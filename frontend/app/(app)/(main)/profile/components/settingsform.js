"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useEffect, useState } from "react";
import api from "@/app/util/api";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "@/app/util/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ProfilePageContext } from "../[id]/page";

export default function SettingsForm({ onClose }) {
  const profileDataContext = useContext(ProfilePageContext);
  const [postImage, setPostImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = (e) => {
    if ([e.target.name] == "profile_picture") {
      setPostImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  console.log(postImage);
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const axiosURL = `http://127.0.0.1:8000/user/profile/update/${profileDataContext.profileData.id}/`;
  let formData = new FormData();

  return (
    <div>
      <h1 className="mb-2 text-2xl font-medium">User Settings</h1>
      <Formik
        initialValues={{
          display_name: profileDataContext.profileData.display_name,
          bio: profileDataContext.profileData.bio,
        }}
        enableReinitialize={true}
        onSubmit={async (values, { setSubmitting }) => {
          // setSubmitting(false);
          try {
            console.log(postImage);
            formData.append("display_name", values.display_name);
            formData.append("bio", values.bio);
            if (postImage != "") formData.append("profile_picture", postImage);

            await axios
              .put(axiosURL, formData, config)
              .then((res) => {
                onClose();
              })
              .catch((err) => console.log(err));

            profileDataContext.setProfileData({
              ...profileDataContext.profileData,
              display_name: values.display_name,
              bio: values.bio,
            });

            if (previewImage != "")
              profileDataContext.setProfileData({
                ...profileDataContext.profileData,
                profile_picture: previewImage,
              });
          } catch (error) {
            alert(error);
          }
          profileDataContext.getProfile();
        }}
      >
        <Form className="flex flex-col gap-2">
          <label
            htmlFor="profile_picture"
            className={`h-20 w-20 rounded-md bg-gray-200`}
          >
            <h1
              className={`flex h-full items-center justify-center text-3xl ${
                previewImage &&
                profileDataContext.profileData.profile_picture == ""
                  ? ""
                  : "hidden"
              }`}
            >
              +
            </h1>
            <img
              className={`h-full w-full rounded-md object-cover`}
              src={
                previewImage == ""
                  ? profileDataContext.profileData.profile_picture
                  : previewImage
              }
            />
          </label>
          <Field
            id="profile_picture"
            name="profile_picture"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
          <ErrorMessage name="profile_picture" />

          <label htmlFor="display_name" className="text-medium font-medium">
            Display Name
          </label>
          <Field
            id="display_name"
            name="display_name"
            autoComplete="off"
            type="text"
            className="h-10 w-80 rounded-sm bg-gray-200 px-2"
          />
          <ErrorMessage name="display_name" />

          <label htmlFor="bio" className="text-medium font-medium">
            Bio
          </label>
          <Field
            id="bio"
            name="bio"
            type="text"
            as="textarea"
            className="h-20 w-80 rounded-sm bg-gray-200 p-2"
          />
          <ErrorMessage name="bio" />

          <button
            type="submit"
            className="mt-4 h-10 w-80 rounded-md bg-green-600 p-2 text-center text-white"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
