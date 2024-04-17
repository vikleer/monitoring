import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getMonth,
} from "date-fns";

function shouldSkipDate(date: Date, datesToSkip: Date[]): boolean {
  return datesToSkip.some((skipDate) => skipDate.getTime() === date.getTime());
}

export function getDatesInMonth(
  month: number = getMonth(new Date()),
  options?: {
    datesToSkip: Date[];
  },
): Date[] {
  // Ensure month is within 1 to 12
  if (month < 1 || month > 12) {
    throw new Error("Month should be between 1 and 12.");
  }

  // Get the start and end dates of the month
  const startDate = startOfMonth(new Date(new Date().getFullYear(), month, 1));
  const endDate = endOfMonth(startDate);

  // Generate an array of dates for the month
  const allDates = eachDayOfInterval({ start: startDate, end: endDate });

  // Filter out dates that should be skipped
  const filteredDates = options?.datesToSkip
    ? allDates.filter((date) => !shouldSkipDate(date, options.datesToSkip))
    : allDates;

  return filteredDates;
}
