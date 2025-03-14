import { Menu } from "lucide-react";
import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import NavItem from "./HnNavItem";

type PropType = {
  currentPath: string;
  menu: NavItemType[];
};
export default function HnXsNav({ currentPath, menu }: PropType) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => setOpenDrawer((v) => !v);

  const renderNavItem = (prop: NavItemType) => (
    <NavItem
      key={prop.href}
      isActive={currentPath.includes(prop.href)}
      {...prop}
      onClick={toggleDrawer}
    />
  );

  return (
    <div className="sm:hidden text-white">
      <Drawer open={openDrawer} onOpenChange={toggleDrawer}>
        <DrawerTrigger asChild>
          <Menu role="button" />
        </DrawerTrigger>
        <DrawerContent className="bg-gray-950 px-6">
          <DrawerHeader>
            <DrawerTitle className="text-white border-b pb-1">
              HN MENU
            </DrawerTitle>
          </DrawerHeader>
          <div className="min-h-72 flex flex-col">
            {menu.map(renderNavItem)}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
