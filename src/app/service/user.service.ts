import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = 'http://localhost:3000/api/users/';

  constructor(private _http: HttpClient) {}

  userRegister(userParams): Observable<any> {
    let params = JSON.stringify(userParams);
    let options = new HttpHeaders().set('Content-type', 'application/json');

    return this._http
      .post(this.apiURL, params, { headers: options })
      .pipe((res) => res);
  }

  showUsers(role): Observable<any> {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
    };
    return this._http
      .get(this.apiURL + 'allUsers/' + role, options)
      .pipe((res) => res);
  }

  //User Update

  userUpdate(idUser, userUpdated): Observable<any> {
    let params = JSON.stringify(userUpdated);
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._http
      .put(this.apiURL + idUser, params, options)
      .pipe((res) => res);
  }

  //Delete User
  deleteUser(idUser): Observable<any> {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._http.delete(this.apiURL + idUser, options).pipe((res) => res);
  }
}
