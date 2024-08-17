import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Paciente } from 'src/app/model/Paciente';
import { PacienteResponse } from 'src/app/model/PacienteResponse';
import { PacienteService } from 'src/app/servicos/paciente.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  public lista: Paciente[] = new Array();
  // paciente!: Paciente;
  public keyword:string = "";
  public loading: boolean = false;
  public pagina: number = 0;
  public tamanho: number = 10;
  public paginasTotais: number = 0;
  public temMaisPaginas: boolean = true;

  public constructor(private pacienteService:PacienteService, private router:Router){}
  
  ngOnInit(): void {
    this.pesquisar();
  }

  public pesquisar() {
    this.loading = true;

    console.log(this.keyword + " - pagina: " + this.pagina + " - tamanho: " + this.tamanho)

    if(this.pagina == undefined) {
      this.pagina = 0;
    }

    this.pacienteService.buscarPacientes(this.keyword, this.pagina, this.tamanho).subscribe({
      next: (res:PacienteResponse) => {
        console.log(res);
        this.loading = false;
        console.log(typeof(res));
        this.lista = res.pacientes;
        console.log(this.lista);
        this.pagina = res.pagina;
        this.paginasTotais = res.paginasTotais;
        this.temMaisPaginas = this.pagina <= this.paginasTotais;
        console.log("next!!");
      },
      error: (err:any) => {   
        if (err.status == 404){
          alert("Paciente com este nome não encontrado")
        }
        else {
          alert("Erro ao pesquisar Paciente");
          this.loading = false;
        }
      }
  });
  }

  public paginaAnterior(event: Event) {
    event.preventDefault();
    if (this.pagina > 0) {
      this.pagina--;
      this.pesquisar();
    }
  }
  
  public proximaPagina(event: Event) {
    event.preventDefault();
    if (this.pagina < this.paginasTotais - 1) {
      this.pagina++;
      this.pesquisar();
    }
  }
  
  public irParaPagina(pagina: number, event: Event) {
    event.preventDefault();
    if (pagina >= 0 && pagina < this.paginasTotais) {
      this.pagina = pagina;
      this.pesquisar();
    }
  }

  public getPaginas(): number[] {
    return Array(this.paginasTotais).fill(0).map((x, i) => i);
  }

  public adicionarPaciente(): void{
    this.router.navigate(['paciente']);
  }

  public verDetalhes(idPaciente: number): void {
    this.router.navigate(['/paciente', idPaciente]);
  }
}
