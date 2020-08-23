import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from '../snackbar.service';
import { ResponseService } from '../response/response.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: window.localStorage.getItem('currentUser') ? {
        authorization: `Bearer ${window.localStorage.getItem('currentUser')}`
      } : {}
    });
    return next.handle(request);
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  returnUrl: string;

  constructor(
    private router: Router,
    private snackBar: SnackbarService,
    private response: ResponseService

  ) { }



  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          const error = err.error.message || err.statusText;
          this.snackBar.openSnackBar(error);
          window.localStorage.clear();
          this.router.navigate(['/login']);
        }
        if (err.status === 403) {
          this.snackBar.openSnackBar(err.error.message);
        }

        return this.response.handleError(err);
      }));
  }


}
