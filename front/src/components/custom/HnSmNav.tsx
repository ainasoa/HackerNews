import React from "react";
import NavItem from "./HnNavItem";

type PropType = {
  currentPath: string;
  menu: NavItemType[];
};
export default function HnSmNav({ currentPath, menu }: PropType) {
  const renderNavItem = (prop: NavItemType) => (
    <NavItem
      key={prop.href}
      isActive={currentPath.includes(prop.href)}
      {...prop}
    />
  );

  return <nav className="hidden sm:flex">{menu.map(renderNavItem)}</nav>;
}
