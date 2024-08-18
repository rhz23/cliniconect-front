import { Cidade } from "./Cidade";

export class Endereco {
    public idEndereco: number = 0;
    public logradouro: string = "";
    public complemento: string = "";
    public cep: string = "";
    public cidade: Cidade = new Cidade();
  }