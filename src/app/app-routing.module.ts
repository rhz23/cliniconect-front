import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path: "main", component: MainComponent},
  {path: "paciente", component: PacienteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
