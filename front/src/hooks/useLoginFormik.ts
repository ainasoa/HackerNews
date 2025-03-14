import { signIn } from "next-auth/react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import routePath from "@/lib/routePath";

export default function useLoginFormik() {
  const router = useRouter();

  const [submitError, setSubmitError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        setSubmitError("");

        await signIn("credentials", {
          redirect: false,
          ...values,
        });

        await router.replace(routePath["/news"]);
      } catch (error) {
        console.log(error);

        const msg = (error as any).response?.data;

        setSubmitError(msg || " An error occurs !");
      }
    },
  });

  return { ...formik, submitError };
}
