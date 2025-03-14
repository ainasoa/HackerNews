import routePath from "@/lib/routePath";
import { redirect } from "next/navigation";

export default function page() {
  return redirect(routePath["/news"]);
}
