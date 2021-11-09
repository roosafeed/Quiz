import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { TokenService } from '../app/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'quiz';
  isLoggedIn!: boolean;

  constructor(private token: TokenService, private route: Router) {
    route.events.subscribe(e => {
      if(e instanceof NavigationStart) {
        // this.loading = true;
        // console.log("start");
      }

      if(e instanceof NavigationEnd) {
        // this.loading = false;
        this.isLoggedIn = this.token.isLoggedIn();
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.token.isLoggedIn();
  }

  logOut() {
    this.token.signOut();
    this.isLoggedIn = this.token.isLoggedIn();
    this.route.navigate(['']);
  }
}
