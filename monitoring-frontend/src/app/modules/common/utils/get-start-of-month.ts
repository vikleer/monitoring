import { getMonth, getYear, startOfMonth } from "date-fns";

export function getStartOfMonth(
  month: number = getMonth(new Date()),
  year: number = getYear(new Date()),
): Date {
  return startOfMonth(new Date(year, month, 1));
}
