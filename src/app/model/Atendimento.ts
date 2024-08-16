import { Paciente } from "./Paciente";

export class Atendimento {
    idAtendimento: number = 0;
    dataAtendimento: Date = new Date();
    infoAtendimento: string = "";
    paciente: Paciente = new Paciente();
}