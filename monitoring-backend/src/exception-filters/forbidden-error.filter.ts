import { AnyAbility, ForbiddenError } from "@casl/ability";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { throwForbidden } from "@src/utils/throw-forbidden";

@Catch(ForbiddenError)
export class ForbiddenErrorFilter implements ExceptionFilter {
  public catch(
    exception: ForbiddenError<AnyAbility>,
    host: ArgumentsHost,
  ): void {
    throwForbidden();
  }
}
