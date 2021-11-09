import { Injectable } from '@angular/core';

import { Question } from '../app/question';
import QuestionsJson from '../assets/questions.json';

interface Questions {
  questions: any[];
}

const token = "QUIZ";

@Injectable({
  providedIn: 'root'
})
export class QuizqService {
  quizInit(): void {
    window.sessionStorage.removeItem(token);
    const q = JSON.parse('{"questions": []}');
    window.sessionStorage.setItem(token, JSON.stringify(q));
  }

  quizDel(): void {
    window.sessionStorage.removeItem(token);
  }

  quizActive(): boolean {
    const tok = window.sessionStorage.getItem(token);
    if(tok || tok != null) {
      return true;
    }
    else {
      return false;
    }
  }

  nextQuestion(): Question | null {
    const qs: Question[] = this.loadAllQuestions();
    const len: number = qs.length;

    const viewedQs: any[] = this.loadViewedQuestions();  
    const vlen: number = viewedQs.length;

    if(len == vlen) {
      return null;
    }

    const q: Question = qs[vlen];
    // viewedQs.push(q);
    // var sq: Questions = {"questions": []};
    // sq.questions = viewedQs;
    // window.sessionStorage.setItem(token, JSON.stringify(sq));

    return q;
  }

  loadAllQuestions(): Question[] {
    const qs: Questions = QuestionsJson;
    var qList: Question[] = [];
    qs.questions.forEach((q: any) => {
      qList.push(new Question(q));
    });

    return qList;
  }

  loadViewedQuestions(): any[] {
    const tok = window.sessionStorage.getItem(token);
    var qs!: Questions;
    var qList: any[] = [];
    if(tok !== null) {
      qs = JSON.parse(tok);
      qs.questions.forEach((q: any) => {
        qList.push(q);
      });
    }
    return qList;
  }

  getQuestionCount(): any {
    const qs: Question[] = this.loadAllQuestions();
    const len: number = qs.length;

    const viewedQs: Question[] = this.loadViewedQuestions();  
    const vlen: number = viewedQs.length;

    return {"cur": vlen, "tot": len};
  }

  markAnswer(q: Question, choice: number): void {
    var sq: Questions = {"questions": []};
    const viewedQs: any[] = this.loadViewedQuestions(); 
    const c: any = {
      "id": q.id,
      "question": q.question,
      "options": q.options,
      "selected": choice
    }

    viewedQs.push(c);
    sq.questions = viewedQs;
    window.sessionStorage.setItem(token, JSON.stringify(sq));

  }
  
}
