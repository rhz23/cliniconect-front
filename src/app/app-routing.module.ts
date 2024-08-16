import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { AtendimentosComponent } from './componentes/atendimentos/atendimentos.component';
import { MidiasComponent } from './componentes/midias/midias.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path: "main", component: MainComponent},
  {path: "paciente/:id", component: PacienteComponent, children: [
    {path: "formulario", component: FormularioComponent},
    {path: "atendimentos", component: AtendimentosComponent},
    {path: "midias", component: MidiasComponent},
    { path: "", redirectTo: "formulario", pathMatch: "full" } // Redirecionar para "formulario" por padrão

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
