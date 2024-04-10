import {
  DateRange,
  DateTime,
  DayTime,
} from "@src/modules/monitoring/types/dates";

/**
 * Creates a DateRange object from a DateTime object.
 *
 * @param dateTime - The DateTime object containing the date and time information.
 * @returns The DateRange object with the start and end dates.
 */
export function createDateFromDateTime(dateTime: DateTime): DateRange {
  const dateParts = dateTime.date.split("-").map(Number);
  const timeStartParts = dateTime.time.start.split(":").map(Number);
  const timeEndParts = dateTime.time.end.split(":").map(Number);

  // Assuming date format is "YYYY-MM-DD" and time format is "HH:MM"
  const [year, month, day] = dateParts;
  const [startHour, startMinute] = timeStartParts;
  const [endHour, endMinute] = timeEndParts;

  // Months are 0-based in JavaScript Dates
  const jsMonth = month - 1;

  // Create the Date object
  const startDate = new Date(year, jsMonth, day, startHour, startMinute);
  const endDate = new Date(year, jsMonth, day, endHour, endMinute);

  return { startDate: startDate, endDate: endDate };
}

/**
 * Creates an array of date ranges based on the given weekDayTime and dateRange.
 *
 * @param weekDayTime - The day and time to match.
 * @param dateRange - The range of dates to loop through.
 * @returns An array of date ranges that match the given weekDayTime.
 */
export function createDateFromWeekDayTime(
  weekDayTime: DayTime,
  dateRange: {
    start: Date;
    end: Date;
  },
): DateRange[] {
  const dateRanges: DateRange[] = [];

  // Loop through each date within the startDate and endDate range
  const currentDate = new Date(dateRange.start);

  while (currentDate <= dateRange.end) {
    // Check if the day matches
    if (currentDate.getDay() === weekDayTime.day) {
      const timeStartParts = weekDayTime.time.start.split(":").map(Number);
      const timeEndParts = weekDayTime.time.end.split(":").map(Number);

      const [startHour, startMinute] = timeStartParts;
      const [endHour, endMinute] = timeEndParts;

      const startDate = new Date(currentDate);
      startDate.setHours(startHour, startMinute, 0, 0);

      const endDate = new Date(currentDate);

      endDate.setHours(endHour, endMinute, 0, 0);
      dateRanges.push({ startDate: startDate, endDate: endDate });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRanges;
}

/**
 * Creates an array of date ranges based on a given month, day, and time range.
 *
 * @param monthDayTime - The month, day, and time range to match.
 * @param dateRange - The start and end dates for the range.
 * @returns An array of date ranges that match the given month, day, and time range.
 */
export function createDateFromMonthDayTime(
  monthDayTime: DayTime,
  dateRange: {
    start: Date;
    end: Date;
  },
): DateRange[] {
  const dateRanges: DateRange[] = [];

  // Loop through each date within the startDate and endDate range
  const currentDate = new Date(dateRange.start);

  while (currentDate <= dateRange.end) {
    // Check if the day matches
    if (currentDate.getDate() === monthDayTime.day) {
      const timeStartParts = monthDayTime.time.start.split(":").map(Number);
      const timeEndParts = monthDayTime.time.end.split(":").map(Number);

      const [startHour, startMinute] = timeStartParts;
      const [endHour, endMinute] = timeEndParts;

      const startDate = new Date(currentDate);
      startDate.setHours(startHour, startMinute, 0, 0);

      const endDate = new Date(currentDate);
      endDate.setHours(endHour, endMinute, 0, 0);

      dateRanges.push({ startDate: startDate, endDate: endDate });
    }

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return dateRanges;
}
