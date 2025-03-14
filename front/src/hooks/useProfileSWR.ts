import { fetcher } from "@/lib/axiosInstances";
import useSWR from "swr";

export default function useProfileSWR() {
  return useSWR<UserType>("/profil", fetcher);
}
