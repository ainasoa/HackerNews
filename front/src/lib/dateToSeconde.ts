import dayjs from "dayjs";

export default function dateToSeconde(date: string) {
  return dayjs(date).unix();
}
