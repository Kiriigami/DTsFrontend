import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<unknown>> => {
  const token = localStorage.getItem('userToken');
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(authReq);
};
