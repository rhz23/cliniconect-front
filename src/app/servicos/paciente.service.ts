import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { Paciente } from '../model/Paciente';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';
import { PacienteResponse } from '../model/PacienteResponse';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http:HttpClient, private tokenService: TokenService) { }

    public buscarPacientes(nome:string, pagina: number, tamanho: number):Observable<PacienteResponse>{
      let header = this.tokenService.getTokenHeader();
      console.log(header);
      return this.http.get<any>(environment.apiURL+"/pacientes/busca?nome="+nome+"&pagina="+pagina+"&tamanho="+tamanho, { headers: header })
        .pipe(
          map( response => {
            console.log('Resposta da API no serviço: ', response);
            return {
              pacientes: response.Paciente || [],
              pagina: response.pagina || 0,
              tamanho: response.tamanho || 0,
              paginasTotais: response.paginasTotais || 0
            }
          })
        );
    }

    public cadastrarNovoPaciente(paciente: Paciente): Observable<Paciente> {
      const pacienteParaSalvar: Paciente = paciente;

      let header = this.tokenService.getTokenHeader();
      return this.http.post<Paciente>(environment.apiURL+"/pacientes" , paciente, {headers: header});
    }
  
    public atualizarPaciente(paciente: Paciente): Observable<Paciente> {
      const pacienteParaSalvar: Paciente = paciente;

      let header = this.tokenService.getTokenHeader();
      return this.http.put<Paciente>(environment.apiURL+"/pacientes/"+paciente.idPaciente, paciente, {headers: header});
    }

    public buscarPacientePorId(id: string) {
      let header = this.tokenService.getTokenHeader();
      return this.http.get<Paciente>(environment.apiURL + "/pacientes/" + id, {headers: header});  
    }
    
  }
