import React, { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center items-center w-screen sm:h-screen p-6">
      {children}
    </div>
  );
}
