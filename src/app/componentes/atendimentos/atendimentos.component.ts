import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedPacienteService } from 'src/app/servicos/shared-paciente.service';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.css'],
  providers: [DatePipe]
})
export class AtendimentosComponent {

  public loading: boolean = false;
  private idPaciente: string = "";
  public msgModal: string = "";
  public estiloMsg: string = "";
  public selecionaAtendimento: any = {};
  public formattedDate: string = "";


  public constructor(private activatedRoute: ActivatedRoute, 
                    public sharedPaciente: SharedPacienteService,
                    private datePipe: DatePipe) {
    this.idPaciente = this.activatedRoute.parent?.snapshot.params["id"];
    console.log(this.idPaciente);

}

public openModal(atendimento: any) {
  this.selecionaAtendimento = atendimento;
  this.formattedDate = this.datePipe.transform(atendimento.dataAtendimento, 'dd/MM/yyyy HH:mm') || '';
  const modalElement = document.getElementById('atendimentoModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

saveChanges() {
  if (this.selecionaAtendimento) {
    // Encontra o atendimento correspondente na lista e atualiza
    const index = this.sharedPaciente.paciente?.atendimentos.findIndex(
      atendimento => atendimento.idAtendimento === this.selecionaAtendimento.id
    );

    if (index !== undefined && index >= 0) {
      this.sharedPaciente.paciente.atendimentos[index] = this.selecionaAtendimento;
    }
    this.closeModal();
  }
}


public closeModal() {
  const modalElement = document.getElementById('atendimentoModal');
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
}


public formatDate(date: any): string {
  return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
}
}

