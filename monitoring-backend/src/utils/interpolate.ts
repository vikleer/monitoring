/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Retrieves the value from the given context object based on the provided interpolation string.
 * The interpolation string represents a nested key path in the context object.
 *
 * @param interpolation - The interpolation string representing the nested key path.
 * @param context - The context object from which to retrieve the value.
 * @returns The value from the context object based on the interpolation string, or undefined if the key path is not found.
 */
function getContextValueFromInterpolation(
  interpolation: string,
  context: any,
): any {
  // Split the value by dot to get nested keys
  const keys = interpolation.replace(/\${|}/g, "").split(".");

  let obj = context;

  for (const key of keys) {
    if (key in obj) obj = obj[key];
    else return undefined;
  }

  return obj;
}

/**
 * Checks if a string value represents an interpolation.
 * An interpolation is a string enclosed in "${}".
 *
 * @param value - The string value to check.
 * @returns A boolean indicating whether the value is an interpolation.
 */
function isInterpolation(value: string): boolean {
  const regex = /^\${.*}$/; // Regular expression to match "${anything}"
  return regex.test(value);
}

/**
 * Recursively interpolates values in an object using a given context.
 *
 * @param obj - The object to interpolate values in.
 * @param context - The context object containing values for interpolation.
 */
function _interpolate(obj: any, context: any): any {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      if (isInterpolation(obj[key])) {
        obj[key] = getContextValueFromInterpolation(obj[key], context);
      }
    }

    if (
      typeof obj[key] === "object" ||
      (Array.isArray(obj[key]) && obj[key] !== null)
    ) {
      _interpolate(obj[key], context);
    }
  }
}

/**
 * Interpolates the given object with the provided context.
 *
 * @template FinalType - The final type of the interpolated object.
 * @template RawType - The raw type of the object to be interpolated.
 * @template Context - The type of the context used for interpolation.
 *
 * @param obj - The object to be interpolated.
 * @param context - The context used for interpolation.
 * @returns The interpolated object of type FinalType.
 */
export function interpolate<FinalType, RawType, Context>(
  obj: RawType,
  context: Context,
): FinalType {
  const _obj = JSON.parse(JSON.stringify(obj)) as FinalType;
  _interpolate(_obj, context);
  return _obj;
}
