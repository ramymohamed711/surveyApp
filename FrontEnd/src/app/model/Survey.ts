export interface Survey {
  survey_id: number;
  survey_title: string;
  questions: [
    {
      question_id: number;
      question_title: string;
      question_type: boolean;
      question_img: string;
      answers: {
        "answer1": {
          answer: string;
          counter: number;
        }
      },
      suggested_answers: Array<string>
    }
    ];
  survey_statDate: Date,
  survey_endDate: Date,
  survey_status: boolean,
  survey_link: string,
  qrCode: string
}
