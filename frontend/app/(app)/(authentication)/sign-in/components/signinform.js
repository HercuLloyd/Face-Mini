"use client";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useContext } from "react";
import * as Yup from "yup";
import BasicFieldHeader from "@/app/util/components/forms/basicfieldheader";
import ErrorStyling from "@/app/util/components/forms/errorstyling";
import api from "@/app/util/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/app/util/constants";

export default function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const SignInSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <div className="rounded-md border-4 border-slate-300 p-4">
      <h1 className="mb-4 text-3xl font-medium">Sign In</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SignInSchema}
        onSubmit={async (values) => {
          try {
            // get the user id
            const res = await api
              .post("/user/token/", {
                username: values.username,
                password: values.password,
              })
              .then((res) => {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                router.push("/");
              });
          } catch (error) {
            alert(error);
          } finally {
            setLoading(false);
          }
        }}
      >
        <Form className="flex flex-col gap-2">
          <BasicFieldHeader>
            <label htmlFor="username">Username</label>
            <ErrorStyling>
              <ErrorMessage name="username" />
            </ErrorStyling>
          </BasicFieldHeader>
          <Field
            id="username"
            name="username"
            autoComplete="on"
            type="text"
            className="h-10 w-80 rounded-sm border-2 border-slate-300 px-2 outline-none"
          />

          <BasicFieldHeader>
            <label htmlFor="password">Password</label>
            <ErrorStyling>
              <ErrorMessage name="password" />
            </ErrorStyling>
          </BasicFieldHeader>
          <Field
            id="password"
            name="password"
            autoComplete="on"
            type="password"
            className="h-10 w-80 rounded-sm border-2 border-slate-300 px-2 outline-none"
          />

          <h1
            className="w-fit cursor-pointer hover:text-blue-600"
            onClick={() => router.push("/sign-up")}
          >
            Sign up
          </h1>

          <button
            type="submit"
            className="h-10 w-80 rounded-md bg-green-600 p-2 text-center text-white"
          >
            Sign In
          </button>
        </Form>
      </Formik>
    </div>
  );
}
