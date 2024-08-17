import { Paciente } from "./Paciente";

export class PacienteResponse {

    public pacientes: Paciente[] =  [];
    public pagina: number = 0;
    public tamanho: number = 0;
    public paginasTotais: number = 0;

}