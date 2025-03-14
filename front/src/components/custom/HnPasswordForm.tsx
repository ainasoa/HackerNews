import React from "react";
import CustomInput from "./HnInput";
import usePasswordFormik from "@/hooks/usePasswordFormik";
import HnErrorMesssage from "./HnErrorMesssage";
import HnSuccessMesssage from "./HnSuccessMesssage";

import HnSubmitButton from "./HnSubmitButton";

export default function HnPasswordForm() {
  const {
    submitSucces,
    values,
    touched,
    errors,
    submitError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = usePasswordFormik();

  return (
    <div className="w-full">
      <HnSuccessMesssage message={submitSucces} />
      <HnErrorMesssage error={submitError} />
      <div className="hidden sm:flex justify-around mb-6 sm:gap-6">
        <div style={{ width: 100, height: 100 }} />
      </div>
      <CustomInput
        label="Password"
        type="password"
        name="password"
        placeholder="Password"
        value={values.password}
        error={touched.password && errors.password}
        onChange={handleChange}
      />
      <CustomInput
        label="Confirm Password"
        type="password"
        name="confirm_password"
        placeholder="Confirm Password"
        value={values.confirm_password}
        error={touched.confirm_password && errors.confirm_password}
        onChange={handleChange}
      />
      <div className="text-right mt-6">
        <HnSubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
      </div>
    </div>
  );
}
