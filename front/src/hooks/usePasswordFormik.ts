/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { axiosInstance } from "../lib/axiosInstances";
import { useState } from "react";
import * as yup from "yup";

export default function usePasswordFormik() {
  const [submitError, setSubmitError] = useState("");
  const [submitSucces, setSubmitSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      password: yup.string().required(),
      confirm_password: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Password doesn't match!"),
    }),
    onSubmit: async (values, actions) => {
      try {
        setSubmitError("");
        setSubmitSuccess("");

        const body: any = values;
        delete body.confirm_password;

        await axiosInstance.patch("/password", body);
        await setSubmitSuccess("Success !");
        await actions.resetForm();
      } catch (error) {
        console.log(error);
        setSubmitError("An error occurs !");
      }
    },
  });

  return { ...formik, submitError, submitSucces };
}
