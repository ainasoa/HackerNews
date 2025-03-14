import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PropType = {
  label: string;
  error?: string | boolean;
} & React.ComponentProps<"input">;

export default function CustomInput(props: PropType) {
  const { label, error, ...inputProps } = props;

  return (
    <div className="mb-3">
      <Label className="mb-2 pl-3">{label}</Label>
      <Input className="w-full" {...inputProps} />
      {error && (
        <div className="text-red-600 text-right text-sm px-3">{error}</div>
      )}
    </div>
  );
}
