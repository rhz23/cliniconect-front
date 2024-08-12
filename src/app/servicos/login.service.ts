import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { CliniToken } from '../model/CliniToken';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  currentLoggedStatus = this.loggedIn.asObservable();

  updateLoggedIn(newLoggedInStatus: boolean) {
    this.loggedIn.next(newLoggedInStatus);
  }

  constructor(private http: HttpClient) { }

  public efetuarLogin(usuario: Usuario): Observable<CliniToken> {
    return this.http.post<CliniToken>(environment.apiURL + "/login", usuario);
  }
}
