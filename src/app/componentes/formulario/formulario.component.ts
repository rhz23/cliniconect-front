import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cidade } from 'src/app/model/Cidade';
import { DadosCEP } from 'src/app/model/DadosCEP';
import { Estado } from 'src/app/model/Estado';
import { Paciente } from 'src/app/model/Paciente';
import { CepService } from 'src/app/servicos/cep.service';
import { PacienteService } from 'src/app/servicos/paciente.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public paciente: Paciente;
  public loading: boolean = false;
  private idPaciente: string = "";

  public constructor(private CepService: CepService, 
                    private activatedRoute: ActivatedRoute, 
                    private pacienteService:PacienteService) {
    this.paciente = new Paciente();
    this.idPaciente = this.activatedRoute.parent?.snapshot.params["id"];
    console.log(this.idPaciente);
  }


  ngOnInit(): void {
  }

  public buscarCEP() {
    this.loading = true;
    let cep = this.paciente.endereco.cep.replaceAll("-","").replaceAll(".","");
    this.CepService.buscarCEP(this.paciente.endereco.cep).subscribe({
      next: (res: DadosCEP) => {
        this.loading = false;
        this.paciente.endereco.logradouro = res.logradouro;
        this.paciente.endereco.cidade = new Cidade();
        this.paciente.endereco.cidade.nomeCidade = res.localidade;
        this.paciente.endereco.cidade.estado = new Estado();
        this.paciente.endereco.cidade.estado.siglaEstado = res.uf;
      },
      error: (err: any) => {
        alert("Impossível recuperar CEP")
        this.loading = false;
      }
    });

  }

  public salvarPaciente() {
    console.log(this.paciente);
    const formattedDate = format(this.paciente.dataNascimento, 'dd/MM/yyyy')
    this.paciente.dataNascimento = formattedDate;
    this.paciente.endereco.cep = this.paciente.endereco.cep.replaceAll("-","").replaceAll(".","");

    if (this.idPaciente == "NOVO") {
      console.log(this.paciente.dataNascimento)
      this.gravaNovoPaciente();
    }
    else {
      this.atualizarPacienteExistente();
    }
  }

  public atualizarPacienteExistente() {

  }

  public gravaNovoPaciente() {
    this.loading = true;
    this.pacienteService.cadastrarNovoPaciente(this.paciente).subscribe({
      next: (res: Paciente) => {
        alert("Paciente Cadastrado com sucesso!");
        this.loading = false;
        this.paciente = res;
        this.idPaciente = this.paciente.idPaciente.toString();
      },
      error: () => {

      }
    });
  }

}
