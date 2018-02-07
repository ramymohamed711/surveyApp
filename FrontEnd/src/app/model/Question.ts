export interface Question{
  question_id: number;
  question_title: string;
  question_type: boolean;
  question_img: string;
  answerID : Array<any>;
  suggested_answers: Array<string>;
}


