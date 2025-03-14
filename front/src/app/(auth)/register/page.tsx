/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import HnAuthHeading from "@/components/custom/HnAuthHeading";
import HnAvatar from "@/components/custom/HnAvatar";
import HnCheckBox from "@/components/custom/HnCheckBox";
import HnErrorMesssage from "@/components/custom/HnErrorMesssage";
import CustomInput from "@/components/custom/HnInput";
import HnSubmitButton from "@/components/custom/HnSubmitButton";
import HnTextArea from "@/components/custom/HnTextArea";
import { Button } from "@/components/ui/button";
import useRegisterFormik from "@/hooks/useRegisterFormik";

import routePath from "@/lib/routePath";
import Link from "next/link";
import React, { ChangeEvent } from "react";

export default function RegisterPage() {
  const {
    touched,
    values,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useRegisterFormik();

  const handlePhotoChange = async (file: File) => setFieldValue("photo", file);

  const handleChexBoxChange = async (e: ChangeEvent<HTMLInputElement>) =>
    setFieldValue("visibility", e.target.checked);

  return (
    <form className="max-w-[700px] w-full p-6" onSubmit={handleSubmit}>
      <HnAuthHeading>Sign Out</HnAuthHeading>
      <HnErrorMesssage error={submitError} />
      <div className="flex justify-center mb-6">
        <HnAvatar
          fallbackText="PH"
          src={values.photo ? URL.createObjectURL(values.photo) : ""}
          style={{ width: 100, height: 100 }}
          role="button"
          className="shadow-2xl border"
          onChangePhoto={handlePhotoChange}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-6 w-full">
        <div className="w-full">
          <CustomInput
            label="Username"
            type="text"
            placeholder="Username"
            name="username"
            error={touched.username && errors.username}
            onChange={handleChange}
          />
          <CustomInput
            label="Age"
            type="number"
            placeholder="Age"
            name="age"
            error={touched.age && errors.age}
            onChange={handleChange}
          />
          <HnTextArea
            label="Description"
            placeholder="Description"
            name="description"
            error={touched.description && errors.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <CustomInput
            label="Email"
            type="email"
            name="email"
            placeholder="email@example.com"
            error={touched.email && errors.email}
            onChange={handleChange}
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            error={touched.password && errors.password}
            onChange={handleChange}
          />
          <CustomInput
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            error={touched.confirm_password && errors.confirm_password}
            onChange={handleChange}
          />
          <HnCheckBox
            label="show/hide me"
            name="visibility"
            checked={values.visibility}
            onChange={handleChexBoxChange as any}
          />
        </div>
      </div>
      <div className="flex flex-col items-center mt-5 gap-3">
        <HnSubmitButton
          isSubmitting={isSubmitting}
          className="max-w-[350px] w-full"
        />
        <Button variant="outline" asChild className="max-w-[350px] w-full">
          <Link href={routePath["/login"]} replace>
            Sign In
          </Link>
        </Button>
      </div>
    </form>
  );
}
