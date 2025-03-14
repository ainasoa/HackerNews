"use client";
import HnAuthHeading from "@/components/custom/HnAuthHeading";
import { Button } from "@/components/ui/button";
import routePath from "@/lib/routePath";
import Link from "next/link";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-[430px] w-full">
      <HnAuthHeading>Forgot Password</HnAuthHeading>
      <p className="mb-3 text-center">coming soon!</p>
      <div className="flex flex-col">
        <Button asChild>
          <Link href={routePath["/login"]} replace>
            Back
          </Link>
        </Button>
      </div>
    </div>
  );
}
