import React from "react";

type PropType = {
  message?: string;
};
export default function HnSuccessMesssage({ message }: PropType) {
  if (!message) return;

  return (
    <div className="text-green-600 text-center mb-3 w-full">{message}</div>
  );
}
