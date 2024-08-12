import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../model/Paciente';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http:HttpClient, private tokenService: TokenService) { }

    public buscarPacientes(nome:string):Observable<Paciente[]>{
      let header = this.tokenService.getTokenHeader();
      console.log(header);
      return this.http.get<Paciente[]>(environment.apiURL+"/pacientes/busca?nome="+nome, { headers: header });
    }
  }
