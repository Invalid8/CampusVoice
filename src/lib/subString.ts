export default function SubString(
  value: string | undefined,
  maxLen?: number,
  start?: number
): string {
  if (!value) return "";
  if (!maxLen) maxLen = 8;
  if (!start) start = 0;

  const text = value.substring(start, maxLen);

  return value.length <= maxLen
    ? text
    : "".concat(start > 0 ? "..." : "", text, "...");
}
