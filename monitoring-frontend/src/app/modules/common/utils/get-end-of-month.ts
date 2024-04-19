import { endOfMonth, getMonth, getYear } from "date-fns";

export function getEndOfMonth(
  month: number = getMonth(new Date()),
  year: number = getYear(new Date()),
): Date {
  return endOfMonth(new Date(year, month, 1));
}
