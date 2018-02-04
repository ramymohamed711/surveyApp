"use strict";
const survey = require('../model/Survey');

let obj = {
    getAllSurvey,
    getSurveyByID,
    getAllQuestions,

}

function getAllSurvey(req) {
    return new Promise((resolve, reject) => {
        req.col.find({}).toArray((err, data) => {
            if (err) reject(err);
            // console.log(data);
            resolve(data);
        })
    })
}

function getSurveyByID(req, id) {
    return new Promise((resolve, rej) => {
        req.col.findOne({survey_id: id}, (err, data) => {
            if (err) rej(err);
            resolve(data);
        })
    })
}

function getAllQuestions(req) {
    req.col.findOne({}, (err, data) => {
        if (err) throw err;
        console.log(data);
        return data;
    })
}

module.exports = obj;