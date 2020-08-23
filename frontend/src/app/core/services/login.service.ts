import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
let API_URL = `${environment.URL}/api/v1`;

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private http: HttpClient,

  ) { }

  signUp(body): Observable<any> {
    return this.http.post(`${API_URL}/user/signup`, body).pipe();
  }
  login(body): Observable<any> {
    return this.http.post(`${API_URL}/user/login`, body).pipe();
  }

  profileShare(body): Observable<any> {
    return this.http.post(`${API_URL}/profile/create`, body).pipe();
  }

}
