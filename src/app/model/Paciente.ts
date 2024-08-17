import { Atendimento } from "./Atendimento";
import { Endereco } from "./Endereco";

export class Paciente {
    idPaciente: number = 0;
    nomePaciente: string = "";
    cpfPaciente: string = "";
    sexoPaciente: string = "";
    dataNascimento: string = ";"
    emailPaciente: string = "";
    telefonePaciente: string = "";
    ativoPaciente: boolean = true;
    linkFoto: string = "/assets/avatar.png";
    endereco: Endereco = new Endereco;
    atendimentos: Atendimento[] = [];
    midias: any[] = [];
  }