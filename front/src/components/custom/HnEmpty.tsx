import { LucideIcon } from "lucide-react";
import React from "react";

type PropType = {
  Icon: LucideIcon;
  label: string;
};
export default function HnEmpty(props: PropType) {
  return (
    <div className="text-gray-500 flex flex-col items-center bg-gray-200 p-6 rounded-xl">
      <props.Icon size={32} />
      <p className="text-lg font-semibold">{props.label}</p>
    </div>
  );
}
