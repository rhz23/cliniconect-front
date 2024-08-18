import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cidade } from 'src/app/model/Cidade';
import { DadosCEP } from 'src/app/model/DadosCEP';
import { Estado } from 'src/app/model/Estado';
import { Paciente } from 'src/app/model/Paciente';
import { CepService } from 'src/app/servicos/cep.service';
import { PacienteService } from 'src/app/servicos/paciente.service';
import { format, parse } from 'date-fns';
import { Endereco } from 'src/app/model/Endereco';
import { PathToFile } from 'src/app/model/pathToFile';
import { UploadService } from 'src/app/servicos/upload.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public paciente: Paciente;
  public loading: boolean = false;
  private idPaciente: string = "";
  public msgModal: string = "";
  public estiloMsg: string = "";
  private pathToFile: PathToFile = new PathToFile();
  private mode: string = "";

  public constructor(private CepService: CepService, 
                    private activatedRoute: ActivatedRoute, 
                    private pacienteService: PacienteService,
                    private uploadService: UploadService) {
    this.paciente = new Paciente();
    this.pathToFile = new PathToFile();
    this.idPaciente = this.activatedRoute.parent?.snapshot.params["id"];
    console.log(this.idPaciente);
    
    if (this.idPaciente != "NOVO") {
      this.loading = true;
      this.pacienteService.buscarPacientePorId(this.idPaciente).subscribe({
        next: (res: Paciente) => {
          this.paciente = res;
          if (this.paciente.linkFoto == null) {
            this.paciente.linkFoto = "/assets/avatar.png";
          }
          if (this.paciente.endereco == null) {
            this.paciente.endereco = new Endereco();
          }
          this.convertDataNascimentoFrontEnd();
          console.log(this.paciente);
          this.loading = false;
        },
        error: (erro: any) => {
          this.loading = false;
          this.exibirModal("Erro ao buscar Paciente");
        }
      });
    }
  }


  ngOnInit(): void {
  }

  private convertDataNascimentoFrontEnd(): void {
    if (this.paciente.dataNascimento) {
      const date = parse(this.paciente.dataNascimento, 'dd/MM/yyyy', new Date());
      const formattedDate = format(date, 'yyyy-MM-dd')
      console.log(formattedDate);
      this.paciente.dataNascimento = formattedDate;
    }
  }

  private convertDataNascimentoBackEnd(): void {
    if (this.paciente.dataNascimento) {
      const formattedDate = format(this.paciente.dataNascimento, 'dd/MM/yyyy')
      console.log(formattedDate);
      this.paciente.dataNascimento = formattedDate;
    }
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
        this.exibirModal("Impossível recuperar CEP");
        this.loading = false;
      }
    });

  }

  public salvarPaciente() {
    console.log(this.paciente);
    this.convertDataNascimentoBackEnd();
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
    this.loading = true;
    this.pacienteService.atualizarPaciente(this.paciente).subscribe({
      next: (res: Paciente) => {
        this.exibirModal("Paciente Atualizado com sucesso!");
        this.loading = false;
        this.paciente = res;
        this.idPaciente = this.paciente.idPaciente.toString();
      },
      error: () => {
        this.loading = false;
        this.exibirModal("Erro ao atualizar Paciente!")
      }
    });

  }

  public gravaNovoPaciente() {
    this.loading = true;
    this.pacienteService.cadastrarNovoPaciente(this.paciente).subscribe({
      next: (res: Paciente) => {
        this.loading = false;
        this.exibirModal("Paciente Cadastrado com sucesso!");
        this.paciente = res;
        this.idPaciente = this.paciente.idPaciente.toString();
      },
      error: () => {
        this.loading = false;
        this.exibirModal("Erro ao cadastrar novo Paciente");
      }
    });
  }

  public cancelar() {
    window.history.back();
  }

  public realizarUpload(data: any): void {
    let file = data.target.files[0];
    let formData = new FormData();
    formData.append("arquivo", file, file.name);
    this.loading = true;
    this.uploadService.uploadFile(formData).subscribe({
      next: (res: PathToFile) => {
        this.loading = false;
        this.pathToFile = res;
        this.exibirModal("Upload realizado com sucesso!");
        this.paciente.linkFoto = "/assets/media/" + this.pathToFile.path;
      },
      error: (err: any) => {
        this.loading = false;
        this.exibirModal("Falha ao realizar Upload!");
      }
    });
  }

  public exibirModal(mensagem: string): void {
    this.msgModal = mensagem;
    document.getElementById("btnModalAlerta")?.click();
  }

  public chamarUpload(mode: string): void {
    document.getElementById("btnModalUpload")?.click();
  }

}
