import { Pipe, type PipeTransform } from "@angular/core";
import { getWeekDay } from "@src/app/modules/common/utils/get-week-day";

@Pipe({
  name: "appWeekDay",
  standalone: true,
})
export class WeekDayPipe implements PipeTransform {
  public transform(value: number): string {
    return getWeekDay(value);
  }
}
