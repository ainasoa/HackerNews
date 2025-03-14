/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AlertTriangle } from "lucide-react";

type PropType = {
  error?: any;
};
export default function HnError({ error }: PropType) {
  if (!error) return;

  return (
    <div className="flex flex-col gap-1 items-center text-red-600 font-semibold  text-lg">
      <AlertTriangle />
      There is an error !
    </div>
  );
}
