"use strict";
const survey = require('../model/Survey');

let obj = {
    getAllSurvey,
    getSurveyByID,
    getAllQuestions,
    addSuggestedAnswer,

}

function getAllSurvey(req) {
    return new Promise((resolve, reject) => {
        req.col.find({}).toArray((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    });
}

function getSurveyByID(req, id) {
    console.log(id);
    return new Promise((resolve, rej) => {
        req.col.findOne({survey_id: id}, (err, data) => {
            if (err) rej(err);
            resolve(data);
        })
    });
}

function getAllQuestions(req) {
    req.col.findOne({}, (err, data) => {
        if (err) throw err;
        console.log(data);
        return data;
    })
}

// {$addToSet: {suggested_answers: req.body.suggestedAnswer}},
function addSuggestedAnswer(req, id, quesId) {
    return new Promise((resolve, reject) => {
        req.col.findOne({ survey_id: id, question_id : quesId},  (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

module.exports = obj;