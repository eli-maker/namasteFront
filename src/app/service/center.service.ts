import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CenterService {
  apiURL = 'http://localhost:3000/api/centers/';

  constructor(private _http: HttpClient) {}

  centerRegister(centerParams): Observable<any> {
    let params = JSON.stringify(centerParams);
    let options = new HttpHeaders().set('Content-type', 'application/json');

    return this._http
      .post(this.apiURL, params, { headers: options })
      .pipe((res) => res);
  }

  showCenters(role): Observable<any> {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'aplication/json' }),
    };
    return this._http
      .get(this.apiURL + 'allCenters/' + role, options)
      .pipe((res) => res);
  }

  centersUpdate(idCenter, centerUpdated): Observable<any> {
    let params = JSON.stringify(centerUpdated);
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._http
      .put(this.apiURL + idCenter, params, options)
      .pipe((res) => res);
  }

  deleteCenter(idCenter): Observable<any> {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this._http.delete(this.apiURL + idCenter, options).pipe((res) => res);
  }
}
