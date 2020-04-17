import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let modifiedReq = request.clone();
    if (token) {
      modifiedReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${token.replace('"', '')}`
        ),
      });
    }
    return next.handle(modifiedReq);
  }
}
