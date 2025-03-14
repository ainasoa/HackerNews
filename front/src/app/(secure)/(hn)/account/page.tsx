"use client";
import HnPasswordForm from "@/components/custom/HnPasswordForm";
import HnProfilForm from "@/components/custom/HnProfilForm";
import React from "react";

export default function AccountPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <HnProfilForm />
        <div className="block sm:hidden w-full border-t" />
        <HnPasswordForm />
      </div>
    </div>
  );
}
