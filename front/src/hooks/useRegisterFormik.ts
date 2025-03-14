/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { axiosInstance } from "../lib/axiosInstances";
import { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import routePath from "@/lib/routePath";
import { signIn } from "next-auth/react";

export default function useRegisterFormik() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: {
      photo: null,
      username: "",
      email: "",
      age: "",
      description: "",
      password: "",
      confirm_password: "",
      visibility: true,
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      photo: yup.mixed().nullable(),
      age: yup.number().required(),
      username: yup.string().min(4).required(),
      description: yup.string(),
      visibility: yup.bool(),
      password: yup.string().required(),
      confirm_password: yup
        .string()
        .required("Confirm password is required!")
        .oneOf([yup.ref("password")], "Password doesn't match!"),
    }),
    onSubmit: async (values) => {
      try {
        setSubmitError("");

        const body: any = { ...values };
        delete body.confirm_password;

        await axiosInstance.post<TokenType>("/register", body);

        await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
        });

        await router.replace(routePath["/news"]);
      } catch (error) {
        const msg = (error as any).response?.data;

        setSubmitError(msg || "An error occurs !");
      }
    },
  });

  return { ...formik, submitError };
}
