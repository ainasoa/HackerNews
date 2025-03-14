import React, { PropsWithChildren } from "react";

export default function HnAuthHeading({ children }: PropsWithChildren) {
  return (
    <h1 className="mb-5 text-2xl border-b pb-1 text-center uppercase font-bold">
      {children}
    </h1>
  );
}
