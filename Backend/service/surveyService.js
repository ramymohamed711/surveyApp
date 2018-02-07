"use strict";
// const survey = require('../../FrontEnd/model/Survey');

let obj = {
    getAllSurveys,
    getSurveyByID,
    // submitSurvey,
    updateAnswers,
    addSuggestedAnswer,
    updateAnswersCounters
}


function getAllSurveys(req) {
    return new Promise((resolve, reject) => {
        req.col.find({}).toArray((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    });
}

// function submitSurvey(req) {
//     Promise.all([
//         updateAnswersCounters(req), addSuggestedAnswer(req)
//     ]);
// }

function getSurveyByID(req) {
    // console.log(parseInt(req.params['id']));
    // console.log(id);
    return new Promise((resolve, reject) => {
        console.log(req.params['id'])
        req.col.findOne({survey_id: parseInt(req.params['id'])}, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        });
    });
}

function addSuggestedAnswer(req) {
    return new Promise((resolve, reject) => {
        // let surveyID = parseInt(req.body.surveyID), quesId = parseInt(req.body.quesID);
        let query = {survey_id: parseInt(req.body.surveyID), 'questions.question_id': parseInt(req.body.quesID)};
        let sort = [];
        let operation = {$addToSet: {'questions.$.suggested_answers': req.body.suggestedAnswer}};
        let options = {new: true};
        req.col.findAndModify(query, sort, operation, options, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        })
    });
}

function updateAnswers(req) {
    return new Promise((resolve, reject) => {
        let myAns = req.body.questions;
        let servID = parseInt(req.body.survey);

        let query = {
            survey_id: servID
        };
        let key;
        let sort = [];
        let i = 0;
        for (let ansID in myAns) {
            key = 'questions.' + i + '.answers.' + myAns[ansID] + '.counter';
            console.log(key);
            i++;
            let inc = {};
            inc[key] = 1;

            let operation = ({$inc: inc});
            let options = {new: true, multi: true};
            req.col.findAndModify(query, sort, operation, options, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        }
    });
}

function updateAnswersCounters(req) {
    return new Promise((resolve, reject) => {
        let myAns = req.body.myAnswer;
        let quesID = parseInt(req.body.quesID);
        let servID = parseInt(req.body.surveyID);

        let query = {
            survey_id: servID,
            'questions.question_id': quesID
        };

        for (let ans of myAns) {
            // console.log(ans);
            let sort = [];
            let key = 'questions.$.answers.' + ans + '.counter';
            let inc = {};
            inc[key] = 1;

            let operation = ({$inc: inc});
            let options = {new: true, multi: true};
            req.col.findAndModify(query, sort, operation, options, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        }

    });
}

function removeSuggestedFromBack(req) {
    return new Promise((resolve, reject) => {
        // let surveyID = parseInt(req.body.surveyID), quesId = parseInt(req.body.quesID);
        let query = {survey_id: parseInt(req.body.surveyID), 'questions.question_id': parseInt(req.body.quesID)};
        let sort = [];
        let operation = {$pop: {'questions.$.suggested_answers': 1}};
        let options = {new: true};
        req.col.findAndModify(query, sort, operation, options, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        });
    });
}

function removeSuggestedFromFront(req) {
    return new Promise((resolve, reject) => {
        // let surveyID = parseInt(req.body.surveyID), quesId = parseInt(req.body.quesID);
        let query = {survey_id: parseInt(req.body.surveyID), 'questions.question_id': parseInt(req.body.quesID)};
        let sort = [];
        let operation = {$pop: {'questions.$.suggested_answers': -1}};
        let options = {new: true};
        req.col.findAndModify(query, sort, operation, options, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        });
    });
}

//helper methods
function deleteProperty(req, prop) {
    return new Promise((resolve, reject) => {
        req.col.update({survey_id: parseInt(req.body.id)}, {$unset: {prop: 1}}, (err, doc) => {
            if (err) reject(err);
            resolve(doc);
        })
    });
}

module.exports = obj;