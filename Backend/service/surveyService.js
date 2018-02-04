"use strict";
const survey = require('../model/Survey');

let obj = {
    getAllSurveys,
    getSurveyByID,
    addSuggestedAnswer,
    deleteProperty
}

function getAllSurveys(req) {
    return new Promise((resolve, reject) => {
        req.col.find({}).toArray((err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    });
}

function getSurveyByID(req, id) {
    return new Promise((resolve, rej) => {
        req.col.findOne({survey_id: id}, (err, data) => {
            if (err) rej(err);
            resolve(data);
        })
    });
}

function addSuggestedAnswer(req, id, quesId) {
    return new Promise((resolve, reject) => {
        let query = {survey_id: id, 'questions.question_id': quesId};
        let operation = {$addToSet: {'questions.$.suggested_answers': req.body.suggestedAnswer}};
        let sort = [];
        let options = {new: true};
        req.col.findAndModify(query, sort, operation, options, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    });
}

function deleteProperty(req) {
    return new Promise((resolve, reject) => {
        req.col.update(
            {survey_id: 1}, {$unset: {"questions[5]": ""}}, (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
    });
}


module.exports = obj;