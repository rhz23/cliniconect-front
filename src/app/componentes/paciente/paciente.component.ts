import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PacienteService } from 'src/app/servicos/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit{

  constructor(private router: Router, private pacienteService: PacienteService){}
  
  ngOnInit(): void {
  }


}