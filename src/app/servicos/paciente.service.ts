import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { Paciente } from '../model/Paciente';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';
import { PacienteResponse } from '../model/PacienteResponse';

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
      // const enderecoEnviar = pick(paciente.endereco, 'cep', 'complemento');
      // const pacienteParaEnviar = pick(paciente, 'nomePaciente', 'cpfPaciente', 'sexoPaciente', 'dataNascimento', 'emailPaciente', 'telefonePaciente');


      let header = this.tokenService.getTokenHeader();
      return this.http.post<Paciente>(environment.apiURL+"/pacientes" , paciente, {headers: header});
    }
  
    public atualizarPaciente(paciente: Paciente): Observable<Paciente> {
      let header = this.tokenService.getTokenHeader();
      return this.http.put<Paciente>(environment.apiURL+"/pacientes/"+paciente.idPaciente, paciente, {headers: header});
    }
  }
