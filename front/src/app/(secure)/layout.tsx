import { auth } from "@/lib/auth";
import routePath from "@/lib/routePath";
import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await auth();

  return !!session ? children : redirect(routePath["/login"]);
}
