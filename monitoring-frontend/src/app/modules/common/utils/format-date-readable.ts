import { format, parseISO } from "date-fns";

export function formatDateReadable(date: string | Date): string {
  if (typeof date === "string") date = parseISO(date);

  return format(date, "MMMM d, yyyy h:mm a");
}
