import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { parse } from 'date-fns/parse';
import { Paciente } from 'src/app/model/Paciente';
import { PathToFile } from 'src/app/model/pathToFile';
import { CepService } from 'src/app/servicos/cep.service';
import { PacienteService } from 'src/app/servicos/paciente.service';
import { SharedPacienteService } from 'src/app/servicos/shared-paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  public loading: boolean = false;
  private idPaciente: string = "";
  public msgModal: string = "";
  public estiloMsg: string = "";
  private pathToFile: PathToFile = new PathToFile();

  public constructor(private CepService: CepService,
    private pacienteService: PacienteService,
    public sharedPaciente: SharedPacienteService,
    public router: Router) {
    console.log("PACIENTE COMPONENTE");
  }

  ngOnInit(): void {
  }

  private convertDataNascimentoFrontEnd(): void {
    if (this.sharedPaciente.paciente.dataNascimento) {
      const date = parse(this.sharedPaciente.paciente.dataNascimento, 'dd/MM/yyyy', new Date());
      const formattedDate = format(date, 'yyyy-MM-dd')
      console.log(formattedDate);
      this.sharedPaciente.paciente.dataNascimento = formattedDate;
    }
  }

  public salvarPaciente() {
    console.log(this.sharedPaciente.paciente);
    console.log("Data de nascimento para backend =" + this.sharedPaciente.paciente.dataNascimento);
    this.sharedPaciente.paciente.endereco.cep = this.sharedPaciente.paciente.endereco.cep.replaceAll("-", "").replaceAll(".", "");

    if (this.idPaciente == "NOVO") {
      console.log(this.sharedPaciente.paciente.dataNascimento)
      this.gravaNovoPaciente();
    }
    else {
      this.atualizarPacienteExistente();
    }
  }

  public atualizarPacienteExistente() {
    this.loading = true;
    this.pacienteService.atualizarPaciente(this.sharedPaciente.paciente).subscribe({
      next: (res: Paciente) => {
        this.exibirModal("Paciente Atualizado com sucesso!");
        this.loading = false;
        this.sharedPaciente.paciente = res;
        this.idPaciente = this.sharedPaciente.paciente.idPaciente.toString();
      },
      error: () => {
        this.loading = false;
        this.exibirModal("Erro ao atualizar Paciente!")
      }
    });

  }

  public gravaNovoPaciente() {
    this.loading = true;
    this.pacienteService.cadastrarNovoPaciente(this.sharedPaciente.paciente).subscribe({
      next: (res: Paciente) => {
        this.loading = false;
        this.exibirModal("Paciente Cadastrado com sucesso!");
        this.sharedPaciente.paciente = res;
        this.idPaciente = this.sharedPaciente.paciente.idPaciente.toString();
      },
      error: () => {
        this.loading = false;
        this.exibirModal("Erro ao cadastrar novo Paciente");
      }
    });
  }

  public cancelar() {
    this.router.navigate(['/main']);
  }

  public exibirModal(mensagem: string): void {
    this.msgModal = mensagem;
    document.getElementById("btnModalAlerta")?.click();
  }

}