import React from "react";

type PropType = {
  error?: string;
};
export default function HnErrorMesssage({ error }: PropType) {
  if (!error) return;

  return <div className="text-red-600 text-center mb-3 w-full">{error}</div>;
}
