import {Injectable} from '@angular/core';

@Injectable()
export class QuestionService {
  private obj;
  constructor() {  }
  createQuestion(quest, answers){
    this.obj = {
      question_id: quest.question_id,
      question_title: quest.question_title,
      question_type: quest.question_type,
      question_img: quest.question_img,
      answers: answers,
      suggested_answers: []
    }
    return this.obj;
  }
}
