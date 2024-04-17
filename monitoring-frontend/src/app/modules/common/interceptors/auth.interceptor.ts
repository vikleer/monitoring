import type { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Get the token from storage
  const ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZjdmMTkzM2YtMWUyOC00MDMxLWIxYTUtZjUxYjFlODViZjM2In0sImlhdCI6MTcxMzI5NzI0NSwiZXhwIjoxNzEzOTAyMDQ1fQ.33v8DhFRbGFFvVwtgbxnnSSjuEQDJx7DuQfwP2CyjTg";

  if (ACCESS_TOKEN) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
  }

  return next(req);
};
