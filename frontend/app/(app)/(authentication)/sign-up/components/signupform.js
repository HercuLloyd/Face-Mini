"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import BasicFieldHeader from "@/app/util/components/forms/basicfieldheader";
import ErrorStyling from "@/app/util/components/forms/errorstyling";
import api from "@/app/util/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/app/util/constants";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function SignUpForm() {
  const router = useRouter();
  const [profile, setProfile] = useState({ id: "" });

  const initialFormData = Object.freeze({
    username: "",
    display_name: "",
    password: "",
    repeat_password: "",
  });

  const [profileData, updateFormData] = useState(initialFormData);
  const [postImage, setPostImage] = useState("");

  const handleChange = (e) => {
    if ([e.target.name] == "profile_picture") {
      setPostImage(e.target.files[0]);
    } else {
      updateFormData({
        ...profileData,
        [e.target.name]: e.target.value,
      });
    }
  };
  console.log(profileData);
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const URL = `http://127.0.0.1:8000/user/profile/update/${profile.id}/`;
  let formData = new FormData();
  formData.append("display_name", profileData.display_name);
  formData.append("profile_picture", postImage);

  const registerUser = async () => {
    await api.post("/user/register/", {
      username: profileData.username,
      password: profileData.password,
    })
    .then(
      router.push('/sign-in')
    )
  };

  // const getToken = async () => {
  //   await api
  //     .post("/user/token/", {
  //       username: profileData.username,
  //       password: profileData.password,
  //     })
  //     .then((res) => {
  //       localStorage.setItem(ACCESS_TOKEN, res.data.access);
  //       localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
  //     });
  // };

  // const getProfile = async () => {
  //   await api
  //     .get(
  //       `/user/get-profile/${
  //         jwtDecode(localStorage.getItem(ACCESS_TOKEN)).user_id
  //       }/`
  //     )
  //     .then((res) => res.data)
  //     .then((data) => {
  //       setProfile(data);
  //     });
  // };

  // const updateProfile = async () => {
  //   await axios
  //     .put(URL, formData, config)
  //     .then((res) => {
  //       onClose();
  //     })
  //     .catch((err) => console.log(err));
  // };

  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "Username must be atleast 6 characters")
      .max(20, "Username must be less than 20 characters")
      .required("Required"),
    password: Yup.string()
      .min(8, "Username must be atleast 8 characters")
      .max(20, "Username must be less than 20 characters")
      .required("Required"),
    repeatPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <div className="border-4 border-slate-300 p-4 rounded-md">
      <h1 className="text-3xl font-medium mb-4">Sign Up</h1>
      <Formik
        initialValues={{
          username: profileData.username,
          display_name: profileData.display_name,
          password: profileData.password,
          repeat_password: profileData.repeat_password,
        }}
        enableReinitialize={true}
        validationSchema={SignUpSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values) => {
          try {
            if (localStorage.getItem(ACCESS_TOKEN !== null)) {
              localStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(REFRESH_TOKEN);
            }

            registerUser();

            console.log(profileData);
          } catch (error) {
            alert(error);
          }
        }}
      >
        <Form className="flex flex-col gap-2">
          <label
            htmlFor="profile_picture"
            className={`flex justify-center items-center text-4xl h-20 w-20 bg-gray-200 rounded-md
            `}
          >
            <h1 className={``}>+</h1>
            {/* <img
              className={`h-full w-full rounded-md object-cover `}
              src={''}
            /> */}
          </label>
          <Field
            id="profile_picture"
            name="profile_picture"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
          <ErrorMessage name="profile_picture" />

          <BasicFieldHeader>
            <label htmlFor="username">Username</label>
            <ErrorStyling>
              <ErrorMessage name="username" />
            </ErrorStyling>
          </BasicFieldHeader>
          <Field
            id="username"
            name="username"
            autoComplete="off"
            type="text"
            className="h-10 w-80 px-2 rounded-sm border-2 border-slate-300 outline-none"
            onChange={handleChange}
          />

          {/* <BasicFieldHeader>
            <label htmlFor="display_name">Display Name</label>
            <ErrorStyling>
              <ErrorMessage name="display_name" />
            </ErrorStyling>
          </BasicFieldHeader>
          <Field
            id="display_name"
            name="display_name"
            autoComplete="off"
            type="text"
            className="h-10 w-80 px-2 rounded-sm border-2 border-slate-300 outline-none"
            onChange={handleChange}
          /> */}

          <BasicFieldHeader>
            <label htmlFor="password">Password</label>
            <ErrorStyling>
              <ErrorMessage name="password" />
            </ErrorStyling>
          </BasicFieldHeader>
          <Field
            id="password"
            name="password"
            autoComplete="off"
            type="password"
            className="h-10 w-80 px-2 rounded-sm border-2 border-slate-300 outline-none"
            onChange={handleChange}
          />

          <BasicFieldHeader>
            <label htmlFor="repeat_password">Repeat Password</label>
            <ErrorStyling>
              <ErrorMessage name="repeat_password" />
            </ErrorStyling>
          </BasicFieldHeader>
          <Field
            id="repeat_password"
            name="repeat_password"
            autoComplete="off"
            type="password"
            className="h-10 w-80 px-2 rounded-sm border-2 border-slate-300 outline-none"
            onChange={handleChange}
          />

          <h1
            className="w-fit hover:text-blue-600 cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Sign In
          </h1>

          <button
            type="submit"
            className="h-10 w-80 bg-green-600 text-white text-center rounded-md p-2"
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
}
