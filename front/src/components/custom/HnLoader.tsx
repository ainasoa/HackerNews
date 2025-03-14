import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

type PropType = {
  isLoading?: boolean;
};
export default function HnLoader({ isLoading }: PropType) {
  if (!isLoading) return;

  return (
    <div className="flex flex-col gap-1 items-center text-lg text-gray-600">
      <ClipLoader color="black" loading />
      Loading
    </div>
  );
}
