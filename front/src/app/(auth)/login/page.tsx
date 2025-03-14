"use client";
import HnAuthHeading from "@/components/custom/HnAuthHeading";
import HnErrorMesssage from "@/components/custom/HnErrorMesssage";
import CustomInput from "@/components/custom/HnInput";
import HnSubmitButton from "@/components/custom/HnSubmitButton";
import { Button } from "@/components/ui/button";
import useLoginFormik from "@/hooks/useLoginFormik";
import routePath from "@/lib/routePath";
import Link from "next/link";

import React from "react";

export default function LoginPage() {
  const {
    isSubmitting,
    errors,
    touched,
    submitError,
    handleChange,
    handleSubmit,
  } = useLoginFormik();

  return (
    <form
      className="max-w-[430px] md:max-w-[350px] w-full p-6"
      onSubmit={handleSubmit}
    >
      <HnAuthHeading>Sign In</HnAuthHeading>
      <HnErrorMesssage error={submitError} />
      <CustomInput
        label="Email"
        type="email"
        placeholder="email@example.com"
        name="email"
        error={touched.email && errors.email}
        onChange={handleChange}
      />
      <CustomInput
        label="Password"
        type="password"
        placeholder="Password"
        name="password"
        error={touched.password && errors.password}
        onChange={handleChange}
      />
      <div className="text-right pr-3">
        <Link href="/forgot-password">Forgot password ?</Link>
      </div>
      <div className="flex flex-col mt-5 gap-3">
        <HnSubmitButton isSubmitting={isSubmitting} />
        <Button variant="outline" asChild>
          <Link href={routePath["/register"]} replace>
            Sign Out
          </Link>
        </Button>
      </div>
    </form>
  );
}
