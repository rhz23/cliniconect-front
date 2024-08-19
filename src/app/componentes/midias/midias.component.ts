import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Midia } from 'src/app/model/Midia';
import { PathToFile } from 'src/app/model/pathToFile';
import { SharedPacienteService } from 'src/app/servicos/shared-paciente.service';
import { UploadService } from 'src/app/servicos/upload.service';

@Component({
  selector: 'app-midias',
  templateUrl: './midias.component.html',
  styleUrls: ['./midias.component.css']
})
export class MidiasComponent {

  public loading: boolean = false;
  private idPaciente: string = "";
  public msgModal: string = "";
  public estiloMsg: string = "";
  private pathToFile: PathToFile = new PathToFile();
  public midiaDesc: string = "";

  public constructor(private activatedRoute: ActivatedRoute, 
    public sharedPaciente: SharedPacienteService,
    private uploadService: UploadService) {
    this.pathToFile = new PathToFile();
    this.idPaciente = this.activatedRoute.parent?.snapshot.params["id"];
    console.log(this.idPaciente);
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
      let midia: Midia = new Midia();
      midia.descricao = this.midiaDesc;
      midia.linkMidia = "/assets/media/" + this.pathToFile.path;
      
      if (this.sharedPaciente.paciente) {
        this.sharedPaciente.paciente.midias = this.sharedPaciente.paciente.midias || [];
        this.sharedPaciente.paciente.midias.push(midia);
        
      }

    },
    error: (err: any) => {
      this.loading = false;
      this.exibirModal("Falha ao realizar Upload!");
    }
  });
}

  public chamarUploadDeMidia(mode: string): void {
    document.getElementById("btnModalUploadMidia")?.click();
  }

  public exibirModal(mensagem: string): void {
    this.msgModal = mensagem;
    document.getElementById("btnModalAlerta")?.click();
  }

}
