export default function truncateText(text: string, max: number = 150) {
  if (text.length > max) return text.slice(0, max).concat("...");

  return text;
}
