import { Component, OnInit } from '@angular/core';

import { TokenService } from '../token.service';
import { QuizqService } from '../quizq.service';
import { Options } from '../options';

class Result {
  question!: string;
  choice!: number;
  options!: Options[];
  isCorrect!: boolean

  constructor() {
    this.question = "";
    this.choice = 0;
    this.options = [];
    this.isCorrect = false;
  }
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  isLoggedIn!: boolean;
  results: Result[] = [];
  tot = 0;
  point = 0;


  constructor(private token: TokenService, private quiz: QuizqService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.token.isLoggedIn();
    const r = this.quiz.loadViewedQuestions();
    r.forEach((q: any) => {
      this.tot++;
      const temp: Result = new Result();
      temp.choice = q.selected;
      temp.question = q.question;
      q.options.forEach((o: any) => {
        temp.options.push(new Options(o));
        if(o.isAnswer) {
          temp.isCorrect = o.id == q.selected;
          if(temp.isCorrect) {
            this.point++;
          }
        }
      });

      this.results.push(temp);
    });

    this.quiz.quizDel();
  }

}
