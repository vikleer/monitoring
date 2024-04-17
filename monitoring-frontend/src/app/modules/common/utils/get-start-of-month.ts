import { getMonth, startOfMonth } from "date-fns";

export function getStartOfMonth(month: number = getMonth(new Date())): Date {
  return startOfMonth(new Date(new Date().getFullYear(), month, 1));
}
