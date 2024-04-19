export function getWeekDay(dayNumber: number): string {
  const days: { [key: number]: string } = {
    0: "Domingo",
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
  };

  return days[dayNumber] || "Invalid day number";
}
