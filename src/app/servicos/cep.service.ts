import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosCEP } from '../model/DadosCEP';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) {  }

  public buscarCEP(cep:string): Observable<DadosCEP>{
    return this.http.get<DadosCEP>("http://viacep.com.br/ws/" + cep + "/json/");
  }
}
