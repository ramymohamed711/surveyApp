var express = require('express');
var router = express.Router();
const surveyService = require('../service/surveyService');

/* GET home page. */

router.get('/', (req, res, next) => {
    surveyService.getAllSurvey(req)
        .then(data => res.status(200).json({data: data}))
        .catch(err => console.log(err));
});

router.get('/getSurveyByID/:id', (req, res, next) => {
    surveyService.getSurveyByID(req, parseInt(req.params['id']))
        .then(data => res.status(200).json({data: data}))
        .catch(err => console.log(err));
});


router.get('/addSuggestedAnswer/:surveyID/:quesID', (req, res, next) =>{
    surveyService.addSuggestedAnswer(req, parseInt(req.params['surveyID']), parseInt(req.params['quesID']))
        .then(data => res.status(200).json({data : data}))
        .catch(err => console.log(err));
});
module.exports = router;
