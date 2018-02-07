var rx = require('@reactivex/rxjs')

function assignanswers(req) {
    var counter = 0;
    var answers = {
        'answer1': { 'answer': 'Excellent', 'counter': 0 },
        'answer2': { 'answer': 'Very good', 'counter': 0 },
        'answer3': { 'answer': 'good', 'counter': 0 },
        'answer4': { 'answer': 'not good', 'counter': 0 }
    };

    for (question of req.body.questions) {
        req.body.questions[counter] = {
            'question_id': counter,
            'question_title': question,
            'question_type': true,
            'question_img': '',
            'answers': answers
        }
        counter++;
    }
}

const createsurvey = function (req) {
    assignanswers(req);
    req.counter.findOne(function (err, doc) {
        if (err) throw err
        else {
            let survey_id = parseInt(doc.counter) + 1;
            req.col.insertOne({
                'survey_title': req.body.surveyData.surveytitle,
                'questions': req.body.questions,
                'survey_statDate': req.body.surveyData.surveyStartDate,
                'survey_endDate': req.body.surveyData.surveyEndDate,
                'survey_status': 1,
                'survey_link': 'http://localhost:4200/client/' + survey_id,
                'survey_id': survey_id,
                'qrCode': ''
            }, function (err, doc) {
                if (err) throw err
            })
            req.counter.update({}, { $set: { 'counter': doc.counter + 1 } }, function (err, doc) {
                if (err) throw err
            })
        }

    })
}

module.exports = { createsurvey }