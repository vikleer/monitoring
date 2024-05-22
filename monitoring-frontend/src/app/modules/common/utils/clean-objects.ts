//*export function cleanObject(obj: any) {
//*  // Check if the input is an object
//*  if (obj && typeof obj === 'object') {
//*      // Iterate over the properties of the object
//*      Object.keys(obj).forEach(key => {
//*          // If the property value is an object, recursively clean it
//*          if (typeof obj[key] === 'object') {
//*              cleanObject(obj[key]);
//*              // If the nested object is empty after cleaning, delete the property
//*              if (Object.keys(obj[key]).length === 0) {
//*                  delete obj[key];
//*              }
//*          } else if (obj[key] === null || obj[key] === undefined || obj[key] === '') {
//*              // If the property value is null, undefined, or an empty string, delete the property
//*              delete obj[key];
//*          }
//*      });
//*  }
//*   return obj;
//*}


// clean-objects.ts
export function cleanObject(obj: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      cleanObject(obj[key]);
    } else if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
      delete obj[key];
    }
  });

  return obj;
}
