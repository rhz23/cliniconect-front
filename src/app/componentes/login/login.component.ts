import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CliniToken } from 'src/app/model/CliniToken';
import { Usuario } from 'src/app/model/Usuario';
import { LoginService } from 'src/app/servicos/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  public usuario:Usuario = new Usuario();
  public loading:boolean = false;
  public mensagem:string = "";
  public constructor(private route: Router, private service:LoginService) {

  }

  public logar() {
    this.loading=true;
    this.service.efetuarLogin(this.usuario).subscribe({

      next: (res:CliniToken) => {
        this.loading=false;
        this.service.updateLoggedIn(true);
        localStorage.setItem("CliniConectToken", res.token);
        this.route.navigate(['main']);
      },
      error: (err: any) => {
        this.mensagem="Usuario/Senha Invalidos!"
        alert("LOGIN FALHOU");
        this.loading=false;
      }
      
  });

  }

}
