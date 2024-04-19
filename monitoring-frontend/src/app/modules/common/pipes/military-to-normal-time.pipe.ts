import { Pipe, type PipeTransform } from "@angular/core";
import { militaryToNormalTime } from "@src/app/modules/common/utils/military-to-normal-time";

@Pipe({
  name: "appMilitaryToNormalTime",
  standalone: true,
})
export class MilitaryToNormalTimePipe implements PipeTransform {
  public transform(value: string): string {
    return militaryToNormalTime(value);
  }
}
