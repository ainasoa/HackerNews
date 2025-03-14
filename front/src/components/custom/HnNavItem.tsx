import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type PropType = {
  href: string;
  Icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function HnNavItem(props: PropType) {
  return (
    <Link
      href={props.href}
      className={clsx(
        "p-3 text-white min-w-[100px] text-center hover:text-gray-300 flex items-center gap-2",
        props.isActive && "bg-gray-800 rounded-xl"
      )}
      onClick={props.onClick}
    >
      <props.Icon size={18} />
      {props.label}
    </Link>
  );
}
