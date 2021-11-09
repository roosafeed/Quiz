import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  isLoggedIn!: boolean;

  uname!: string;
  password!: string;

  message!: string;
  status: number = 0;
  load: string = "";

  constructor(private token: TokenService, private route: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.token.isLoggedIn();
  }

  onLogin() {
    this.load = "loading";
    this.isLoggedIn = this.token.signIn(this.uname, this.password);

    if(!this.isLoggedIn) {
      this.message = "Check credentials and try again."
    }
    else {
      this.message = "";
      this.route.navigate(['/quiz']);
    }
  }

}
