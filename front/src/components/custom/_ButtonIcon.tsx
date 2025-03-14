import { LucideIcon } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";

type PropType = {
  Icon: LucideIcon;
  label: string;
  variant?: "destructive" | "outline";
} & React.ComponentProps<"button">;

export default function ButtonIcon(props: PropType) {
  const { Icon, label, ...buttonBrops } = props;

  return (
    <Button className="flex gap-1 items-center" {...buttonBrops}>
      <Icon size={15} />
      {label}
    </Button>
  );
}
