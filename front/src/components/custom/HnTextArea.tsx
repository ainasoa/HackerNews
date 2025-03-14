import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type PropType = {
  label: string;
  error?: string | boolean;
} & React.ComponentProps<"textarea">;
export default function HnTextArea({ label, error, ...props }: PropType) {
  return (
    <div className="mb-3">
      <Label className="mb-2 pl-3">{label}</Label>
      <Textarea {...props} />
      {error && <div className="text-red-600 text-right">{error}</div>}
    </div>
  );
}
