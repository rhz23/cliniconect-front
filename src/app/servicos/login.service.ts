import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';
import { CliniToken } from '../model/CliniToken';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public efetuarLogin(usuario: Usuario): Observable<CliniToken> {
    return this.http.post<CliniToken>(environment.apiURL + "/login", usuario);
  }
}
