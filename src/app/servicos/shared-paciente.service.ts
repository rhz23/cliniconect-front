import { Injectable } from '@angular/core';
import { Paciente } from '../model/Paciente';

@Injectable({
  providedIn: 'root'
})
export class SharedPacienteService {

  paciente: Paciente =  new Paciente();

  constructor() { }
  
}
