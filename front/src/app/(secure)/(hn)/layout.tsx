"use client";

import routePath from "@/lib/routePath";
import { redirect, usePathname } from "next/navigation";

import React, { PropsWithChildren } from "react";
import { Heart, LucideIcon, Newspaper, UserSearch } from "lucide-react";
import HnSmNav from "@/components/custom/HnSmNav";
import HnXsNav from "@/components/custom/HnXsNav";
import Link from "next/link";
import HnLoader from "@/components/custom/HnLoader";
import HnAvatar from "@/components/custom/HnAvatar";
import useProfileSWR from "@/hooks/useProfileSWR";
import { useFavoriteStoryIdsSWR } from "@/hooks/useFavoriteStoriesSWR";

type ItemType = { href: string; label: string; Icon: LucideIcon };

const menu = [
  { href: routePath["/news"], label: "Main", Icon: Newspaper },
  {
    href: routePath["/favorite-news"],
    label: "Favorites Stories",
    Icon: Heart,
  },
  { href: routePath["/users"], label: "See all users", Icon: UserSearch },
] as ItemType[];

export default function AppLayout(props: PropsWithChildren) {
  useFavoriteStoryIdsSWR();
  const pathname = usePathname() as string;
  const { isLoading, error, data } = useProfileSWR();

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center p-6">
        <HnLoader isLoading />
      </div>
    );

  if (error) redirect(routePath["/login"]);

  return (
    <div
      className="grid overflow-hidden h-full"
      style={{ gridTemplateRows: "70px 1fr" }}
    >
      <div className="flex items-center justify-between h-[70px] w-full bg-gray-900 px-4">
        <HnSmNav currentPath={pathname} menu={menu} />
        <HnXsNav currentPath={pathname} menu={menu} />
        <Link href={routePath["/account"]}>
          <HnAvatar
            role="button"
            style={{ width: 45, height: 45 }}
            className="shadow-2xl border"
            src={data?.photo}
            fallbackText={data?.username.slice(0, 2).toUpperCase()}
          />
        </Link>
      </div>
      <div className="p-6 overflow-y-auto">
        <div className="flex justify-center">
          <div className="max-w-[1000px] w-full">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
