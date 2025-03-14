import dayjs from "dayjs";

export default function formatDate(date: string) {
  const now = dayjs();

  let diff = now.diff(date, "second");

  if (diff < 60) return `${diff}s ago`;

  diff = now.diff(date, "minute");

  if (diff < 60) return `${diff}min ago`;

  diff = now.diff(date, "hour");

  if (diff < 24) return `${diff}h ago`;

  diff = now.diff(date, "day");

  if (diff < 7) return `${diff}days ago`;

  diff = now.diff(date, "week");

  if (diff < 4) return `${diff}weeks ago`;

  diff = now.diff(date, "month");

  if (diff < 12) return `${diff}months ago`;

  return dayjs(date).format("MM/DD/YY HH:mm A");
}
