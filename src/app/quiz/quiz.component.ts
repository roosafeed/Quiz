import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { TokenService } from '../token.service';
import { QuizqService } from '../quizq.service';
import { Question } from '../question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  isLoggedIn!: boolean;
  isQuizActive!: boolean;
  currQuestion!: Question;
  cur: number = 0;
  tot: number = 0;
  btnText = "Next Question";
  choice: number = 0;

  constructor(private token: TokenService, 
    private quiz: QuizqService, 
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.token.isLoggedIn();
    this.isQuizActive = this.quiz.quizActive();

    if(this.isQuizActive) {
      this.next();
    }
  }

  startQuiz() {
     this.quiz.quizInit();
     this.isQuizActive = this.quiz.quizActive();
     this.btnText = "Next Question";
    //  this.currQuestion = this.quiz.nextQuestion() || new Question({});
    //  this.cur = this.quiz.getQuestionCount().cur + 1;
    //  this.tot = this.quiz.getQuestionCount().tot;
    this.next();
  }

  endQuiz() {
    this.quiz.quizDel();
    this.isQuizActive = this.quiz.quizActive();
    this.choice = 0;
  }

  next() {
    if(this.choice != 0) {
      this.quiz.markAnswer(this.currQuestion, this.choice);
    }

    if(this.btnText == "Submit") {
      this.isQuizActive = false;
      this.router.navigate(['/result']);
    }

    const q: Question | null = this.quiz.nextQuestion()
    if(q != null)
    {
      this.currQuestion = q;
    }

    this.cur = this.quiz.getQuestionCount().cur + 1;
    this.tot = this.quiz.getQuestionCount().tot;

    if(this.cur == this.tot) {
      this.btnText = "Submit";
    }
    
    this.choice = 0;
  }

  setChoice(val: any) {
    this.choice = parseInt(val.value);
  }

}
