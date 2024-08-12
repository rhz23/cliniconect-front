import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { WaitIconComponent } from './componentes/wait-icon/wait-icon.component';
import { HeaderComponent } from './componentes/header/header.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    WaitIconComponent,
    HeaderComponent,
    PacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
