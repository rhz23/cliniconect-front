import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { format, parse } from 'date-fns';
import { Cidade } from 'src/app/model/Cidade';
import { DadosCEP } from 'src/app/model/DadosCEP';
import { Endereco } from 'src/app/model/Endereco';
import { Estado } from 'src/app/model/Estado';
import { Paciente } from 'src/app/model/Paciente';
import { PathToFile } from 'src/app/model/pathToFile';
import { CepService } from 'src/app/servicos/cep.service';
import { PacienteService } from 'src/app/servicos/paciente.service';
import { SharedPacienteService } from 'src/app/servicos/shared-paciente.service';
import { UploadService } from 'src/app/servicos/upload.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  public loading: boolean = false;
  public msgModal: string = "";
  private pathToFile: PathToFile = new PathToFile();
  private idPaciente: string = "";
  public dataNacimentoFormatada: string= "";

  public constructor(private cepService: CepService,
                    public sharedPaciente: SharedPacienteService,
                    private uploadService: UploadService,
                    private activatedRoute: ActivatedRoute,
                    private pacienteService: PacienteService) {
    this.pathToFile = new PathToFile();
    this.idPaciente = this.activatedRoute.parent?.snapshot.params["id"];
    
    if (this.idPaciente != "NOVO") {
      this.loading = true;
      this.pacienteService.buscarPacientePorId(this.idPaciente).subscribe({
        next: (res: Paciente) => {
          this.sharedPaciente.paciente = res;
          if (this.sharedPaciente.paciente.linkFoto == null) {
            this.sharedPaciente.paciente.linkFoto = "/assets/avatar.png";
          }
          if (this.sharedPaciente.paciente.endereco == null) {
            this.sharedPaciente.paciente.endereco = new Endereco();
          }
          this.convertDataNascimentoFrontEnd();
          console.log(this.sharedPaciente.paciente);
          this.loading = false;
        },
        error: (erro: any) => {
          this.loading = false;
          this.exibirModal("Erro ao buscar Paciente");
        }
      });
    }
    else {
      this.sharedPaciente.paciente = new Paciente();
    }
                    
    }

  ngOnInit(): void {
  }

  private convertDataNascimentoFrontEnd(): void {
    if (this.sharedPaciente.paciente.dataNascimento) {
      const date = parse(this.sharedPaciente.paciente.dataNascimento, 'dd/MM/yyyy', new Date());
      this.dataNacimentoFormatada = format(date, 'yyyy-MM-dd')
      console.log("convert data nascimento to frontend - formaulario: " + this.dataNacimentoFormatada);
    }
  }

  public onDataNascimentoChange(newDate: string): void {
    this.dataNacimentoFormatada = newDate;
    // Atualizar a data de nascimento no sharedPaciente
    this.sharedPaciente.paciente.dataNascimento = format(parse(newDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
  }

  public buscarCEP() {
    console.log("CEP para conversão:" + this.sharedPaciente.paciente.endereco.cep);
    this.loading = true;
    let cep = this.sharedPaciente.paciente.endereco.cep.replaceAll("-","").replaceAll(".","");
    this.cepService.buscarCEP(this.sharedPaciente.paciente.endereco.cep).subscribe({
      next: (res: DadosCEP) => {
        console.log("Dados CEP - " + res);
        this.loading = false;
        this.sharedPaciente.paciente.endereco.logradouro = res.logradouro;
        this.sharedPaciente.paciente.endereco.cidade = new Cidade();
        this.sharedPaciente.paciente.endereco.cidade.nomeCidade = res.localidade;
        this.sharedPaciente.paciente.endereco.cidade.estado = new Estado();
        this.sharedPaciente.paciente.endereco.cidade.estado.siglaEstado = res.uf;
      },
      error: (err: any) => {
        this.exibirModal("Impossível recuperar CEP");
        this.loading = false;
      }
    });
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
        this.sharedPaciente.paciente.linkFoto = "/assets/media/" + this.pathToFile.path;
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
