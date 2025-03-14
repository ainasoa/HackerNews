/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import HnAvatar from "./HnAvatar";
import CustomInput from "./HnInput";
import HnTextArea from "./HnTextArea";
import HnCheckBox from "./HnCheckBox";
import useProfilFormik from "@/hooks/useProfilFormik";
import HnErrorMesssage from "./HnErrorMesssage";
import useProfileSWR from "@/hooks/useProfileSWR";
import HnSubmitButton from "./HnSubmitButton";
import HnSuccessMesssage from "./HnSuccessMesssage";

export default function HnProfilForm() {
  const { data } = useProfileSWR();

  const {
    submitSucces,
    isSubmitting,
    touched,
    values,
    errors,
    submitError,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useProfilFormik();

  const handlePhotoChange = async (file: File) => setFieldValue("photo", file);

  const handleChexBoxChange = async (value: boolean) =>
    setFieldValue("visibility", value);

  return (
    <div className="w-full">
      <HnSuccessMesssage message={submitSucces} />
      <HnErrorMesssage error={submitError} />
      <div className="flex justify-around mb-6 sm:gap-6">
        <HnAvatar
          fallbackText="PH"
          src={values.photo ? URL.createObjectURL(values.photo) : data?.photo}
          style={{ width: 100, height: 100 }}
          role="button"
          className="shadow-2xl border"
          onChangePhoto={handlePhotoChange}
        />
      </div>
      <CustomInput
        label="Username"
        type="text"
        placeholder="Username"
        name="username"
        error={touched.username && errors.username}
        value={values.username}
        onChange={handleChange}
      />
      <CustomInput
        label="Age"
        type="number"
        placeholder="Age"
        name="age"
        value={values.age}
        error={touched.age && errors.age}
        onChange={handleChange}
      />
      <CustomInput
        label="Email"
        type="email"
        placeholder="email@example.com"
        name="email"
        value={values.email}
        error={touched.email && errors.email}
        onChange={handleChange}
      />
      <HnTextArea
        label="Description"
        placeholder="Description"
        name="description"
        value={values.description}
        error={touched.description && errors.description}
        onChange={handleChange}
      />
      <HnCheckBox
        label="show/hide me"
        name="visibility"
        onCheckedChange={handleChexBoxChange}
        checked={!!values.visibility}
      />
      <div className="text-right mt-3">
        <HnSubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
      </div>
    </div>
  );
}
