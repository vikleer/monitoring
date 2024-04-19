export function militaryToNormalTime(militaryTime: string): string {
  // Split the military time string into hours and minutes
  const [hoursStr, minutesStr] = militaryTime.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Determine if it's AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  let hours12 = hours % 12;
  hours12 = hours12 === 0 ? 12 : hours12;

  // Format the minutes part
  const minutesFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // Construct the transformed time string
  return `${hours12}:${minutesFormatted} ${period}`;
}
