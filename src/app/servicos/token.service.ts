import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) {}

    public getTokenHeader(): any{
      let token = localStorage.getItem("CliniConectToken") || "";
      if (token == "") {
        console.log("sem token")
        this.router.navigate(["/"]);
      }
      console.log(token);
      let header = {
        "Authorization": token
      }
      return header;
    }
  }
