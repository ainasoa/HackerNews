import { LucideIcon } from "lucide-react";
import React from "react";
import { CardDescription } from "@/components/ui/card";

type PropType = {
  Icon: LucideIcon;
  label: string;
};

export default function IconLabel(props: PropType) {
  return (
    <CardDescription className="flex gap-1 items-center">
      <props.Icon size={15} />
      {props.label}
    </CardDescription>
  );
}
