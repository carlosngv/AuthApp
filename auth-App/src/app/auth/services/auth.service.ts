import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base_url: string = environment.API_URL;
  private _user: User = {} as User;

  get usuario() {
    return {...this._user};
  }

  constructor(
    private http: HttpClient,
  ) { }

    login( email: string, password: string ): Observable<any> {

      const url = this.base_url + '/auth';

      const body = { email, password };

      return this.http.post<AuthResponse>(url, body)
        .pipe(
          tap( res => {
            if(res.ok) {
              localStorage.setItem('token', res.token!);
              this._user = {
                name: res.name,
                uid: res.uid,
                email: res.email
              }
            }
          }),
          map(res => res.ok),
          catchError(err => of(err.error.msg))
        );

    }

    createUser(email: string, name: string, password: string) {
      const url = this.base_url + '/auth/new';
      const body = {
        email,
        name,
        password
      }
      return this.http.post<AuthResponse>(url, body)
        .pipe(
          tap( res => {
            if(res.ok) {
              localStorage.setItem('token', res.token!);
              this._user = {
                name: res.name,
                uid: res.uid,
                email: res.email
              }
            }
          }),
          map( res => res.ok ),
          catchError(err => of(err.error.msg))
        );
    }


    validateToken() {

      const url = this.base_url + '/auth/renew';

      const headers = new HttpHeaders()
       .set('x-token', localStorage.getItem('token') || '' );

      return this.http.get<AuthResponse>(url, { headers })
        .pipe(
          map( res => {
            localStorage.setItem('token', res.token!);
            this._user = {
              name: res.name,
              uid: res.uid,
              email: res.email
            }
            return res.ok
          }),
          catchError(err => of(false))
        );
    }

    logout() {
      localStorage.clear();
    }

}
