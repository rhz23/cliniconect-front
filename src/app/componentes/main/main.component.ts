import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Paciente } from 'src/app/model/Paciente';
import { PacienteService } from 'src/app/servicos/paciente.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  public lista: Paciente[] = [];
  paciente!: Paciente;
  public keyword:string = "";
  public loading: boolean = false;
  public pagina: number = 0;
  public tamanho: number = 10;
  public temMaisPaginas: boolean = true;

  public constructor(private pacienteService:PacienteService, private router:Router){}
  
  ngOnInit(): void {
    this.pesquisar();
  }

  public pesquisar() {
    this.loading = true;

    this.pacienteService.buscarPacientes(this.keyword, this.pagina, this.tamanho).subscribe({
      next: (res:Paciente[]) => {
        this.loading = false;
        this.lista = res;
        this.temMaisPaginas = res.length === this.tamanho;
        console.log(JSON.stringify(this.lista))
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

  public paginaAnterior() {
    if (this.pagina > 0) {
      this.pagina--;
      this.pesquisar();
    }
  }

  public proximaPagina() {
    this.pagina++;
    this.pesquisar();
  }

  public adicionarPaciente(): void{
    this.router.navigate(['paciente']);
  }
}
