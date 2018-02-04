var express = require('express');
var router = express.Router();
const surveyService = require('../service/surveyService');

/* GET home page. */

// get all the surveys
router.get('/', (req, res, next) => {
    surveyService.getAllSurveys(req)
        .then(data => res.status(200).json({data: data}))
        .catch(err => console.log(err));
});

//get survey by ID
router.get('/getSurveyByID/:id', (req, res, next) => {
    surveyService.getSurveyByID(req, parseInt(req.params['id']))
        .then(data => res.status(200).json({data: data}))
        .catch(err => console.log(err));
});

//add Suggested Answer to its array
router.put('/addSuggestedAnswer/:surveyID/:quesID', (req, res, next) =>{
    // console.log(req.body);
    surveyService.addSuggestedAnswer(req, parseInt(req.params['surveyID']), parseInt(req.params['quesID']))
        .then(data => res.status(200).json({data : data}))
        .catch(err => console.log(err));
});

// delete property
router.post('/update', (req,res,next)=>{
    surveyService.deleteProperty(req)
        .then(data => res.status(200).json({data : data}))
        .catch(err => console.log(err));
});



module.exports = router;
