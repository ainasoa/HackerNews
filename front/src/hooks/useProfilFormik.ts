/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { axiosInstance } from "../lib/axiosInstances";
import { useState } from "react";
import * as yup from "yup";
import useProfileSWR from "./useProfileSWR";

const initialValues = {
  photo: null,
  username: "",
  email: "",
  description: "",
  visibility: true,
  age: "",
};

export default function useProfilFormik() {
  const { data, mutate } = useProfileSWR();

  const [submitError, setSubmitError] = useState("");
  const [submitSucces, setSubmitSuccess] = useState("");

  const formik = useFormik({
    initialValues: data ? { ...data, photo: null } : initialValues,
    validationSchema: yup.object({
      email: yup.string().email().required(),
      photo: yup.mixed().nullable(),
      username: yup.string().min(4).required(),
      description: yup.string().nullable(),
      visibility: yup.boolean().required(),
      age: yup.number().required(),
    }),
    onSubmit: async (values) => {
      try {
        setSubmitError("");
        setSubmitSuccess("");

        const body: any = values;

        if (!values.photo) delete body.photo;

        await axiosInstance.patch("/profil", body);

        await mutate();
        await setSubmitSuccess("Success !");
      } catch (error) {
        console.log(error);
        setSubmitError("An error occurs !");
      }
    },
  });

  return { ...formik, submitError, submitSucces };
}
