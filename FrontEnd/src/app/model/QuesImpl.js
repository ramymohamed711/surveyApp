import {Question} from "./Question";

export class QuesImpl<T> implements Question {
  constructor(id, title, type, img, ans, status, link, qrLink) {
    this.obj = {
      question_id: id,
      question_title: title,
      question_type: type,
      question_img: img,
      answerID: ans
    }
  }
}
