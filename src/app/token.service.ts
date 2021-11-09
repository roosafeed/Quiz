//dummy login
const username = "quiz";
const password = "quiz123";
const token = "AUTH_KEY";

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  signOut(): void {
    window.sessionStorage.clear();
  }

  signIn(uname: string, pass: string): boolean {
    if(uname == username && pass == password) {
      window.sessionStorage.removeItem(token);
      window.sessionStorage.setItem(token, username);
      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {
    const tok = window.sessionStorage.getItem(token);
    if(tok || tok != null) {
      return true;
    }
    else {
      return false;
    }
  }

}
