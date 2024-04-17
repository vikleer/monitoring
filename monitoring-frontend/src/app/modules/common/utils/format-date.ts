import { format, parseISO } from "date-fns";

export function formatDate(date: string | Date): string {
  if (typeof date === "string") date = parseISO(date);

  return format(date, "yyyy-MM-dd");
}
