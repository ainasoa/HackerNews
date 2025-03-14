import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { CheckboxProps } from "@radix-ui/react-checkbox";

type PropType = {
  label: string;
} & CheckboxProps;
export default function HnCheckBox({ label, ...props }: PropType) {
  return (
    <div className="flex gap-3 mb-3">
      <Checkbox {...props} id={props.name} />
      <Label htmlFor={props.name}>{label}</Label>
    </div>
  );
}
