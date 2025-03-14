import React, { ComponentProps } from "react";

type PropType = {
  label: string;
} & ComponentProps<"div">;

export default function HnFilterWrapper({
  label,
  children,
  ...props
}: PropType) {
  return (
    <div {...props} className="mb-3">
      <h4 className="font-bold text-nowrap mb-2">{label} :</h4>
      <div className="flex items-center w-full gap-1">{children}</div>
    </div>
  );
}
