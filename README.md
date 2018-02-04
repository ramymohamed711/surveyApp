#Survey application
--Main Idea: 
Survey application consists of two parts, the first part for the application's administrator with the roles of login, create, update or end the surveys, watch the current percentage of each answer and suggestions for all questions in real time, and publish the survey via a link and QR code on a printed paper, the second part for the survey's respondents with the roles of answer the questions, suggest an answer for specific question, and receive an email if he/she subscribed to the survey and interested in getting reply for his/her suggestions.

DB link: https://mlab.com/databases/survey572

Connection string: mongodb://<dbuser>:<dbpassword>@ds125068.mlab.com:25068/survey572

db.survey.insertOne({survey_id:1,
survey_title:"Test title",
questions:[
{
    question_id:1,
    question_title:"Question 1",
    question_type:1,
    question_img:"",
    answers:[
        {answer:"Answer1",counter:0},
        {answer:"Answer2",counter:0},
        {answer:"Answer3",counter:0},
    ],
    suggested_answers:["Sug-Answer1" , "Sug-Answer2"]
},
{
    question_id:2,
    question_title:"Question 2",
    question_type:3,
    question_img:"",
    answers:[
        {answer:"Answer1",counter:0},
        {answer:"Answer2",counter:0},
        {answer:"Answer3",counter:0},
    ],
    suggested_answers:[]
},
{
    question_id:3,
    question_title:"Question 3",
    question_type:1,
    question_img:"",
    answers:[
        {answer:"Answer1",counter:0},
        {answer:"Answer2",counter:0},
        {answer:"Answer3",counter:0},
    ],
    suggested_answers:[]
}
],
survey_statDate: 10/10/2020,
survey_endDate: 10/15/2020,
survey_status: 1,
survey_link: "localhost:8080/Backend/survery/1"
qrCode: "localhost:8080/surveys/1.png"
});

