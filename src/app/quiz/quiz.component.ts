import { Component, OnInit } from '@angular/core';

import { TokenService } from '../token.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  isLoggedIn!: boolean;

  constructor(private token: TokenService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.token.isLoggedIn();
  }

}
