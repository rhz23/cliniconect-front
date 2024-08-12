import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/servicos/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: Observable<boolean> = this.loginService.currentLoggedStatus;

  constructor(private loginService: LoginService){}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.currentLoggedStatus;
  }


}
