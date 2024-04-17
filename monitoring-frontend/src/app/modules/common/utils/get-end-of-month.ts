import { endOfMonth, getMonth } from "date-fns";

export function getEndOfMonth(month: number = getMonth(new Date())): Date {
  return endOfMonth(new Date(new Date().getFullYear(), month, 1));
}
