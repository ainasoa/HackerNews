import { fetcher } from "@/lib/axiosInstances";
import useSWR from "swr";

export default function useUsersSWR() {
  const swr = useSWR<UserType[]>(`/users`, fetcher);

  return swr;
}
