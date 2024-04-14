import type { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Get the token from storage
  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMGRlZWFlOWQtY2QyNy00NGRiLWFlNGUtNjE4MmFkN2QwZWI4In0sImlhdCI6MTcxMzEyNjQzMSwiZXhwIjoxNzEzNzMxMjMxfQ.s9uQArlP_g-FlBs_YdPmFE5vpT7B-owW_caYQDAby_c";

  if (ACCESS_TOKEN) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  return next(req);
};
