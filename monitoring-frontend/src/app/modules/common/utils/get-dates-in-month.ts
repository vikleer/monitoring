import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getMonth,
  getYear,
} from "date-fns";

function shouldSkipDate(date: Date, datesToSkip: Date[]): boolean {
  return datesToSkip.some((skipDate) => skipDate.getTime() === date.getTime());
}

export function getDatesInMonth({
  month = getMonth(new Date()),
  year = getYear(new Date()),
  datesToSkip = [],
}: {
  month?: number;
  year?: number;
  datesToSkip?: Date[];
}): Date[] {
  // Get the start and end dates of the month
  const startDate = startOfMonth(new Date(year, month, 1));
  const endDate = endOfMonth(startDate);

  // Generate an array of dates for the month
  const allDates = eachDayOfInterval({ start: startDate, end: endDate });

  // Filter out dates that should be skipped
  const filteredDates = datesToSkip
    ? allDates.filter((date) => !shouldSkipDate(date, datesToSkip))
    : allDates;

  return filteredDates;
}
