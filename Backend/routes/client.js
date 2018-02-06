var express = require('express');
var router = express.Router();
const surveyService = require('../service/surveyService');
"use strict";

// get all the surveys
router.get('/', (req, res, next) => {
    surveyService.getAllSurveys(req)
        .then(data => res.status(200).json({data: data}))
        .catch(err => console.log(err));
});

router.put('/submitSurvey', (req, res, next) => {
    // surveyService.submitSurvey(req)
    Promise.all([surveyService.updateAnswersCounters(req), surveyService.addSuggestedAnswer(req)])
        .then(data => res.status(200).json({data : data}))
        .catch(err => console.log(err));
});

//
// //get survey by ID
// router.get('/getSurveyByID/:id', (req, res, next) => {
//     // console.log(parseInt(req.params['id']));
//     surveyService.getSurveyByID(req)
//         .then(data => res.status(200).json({data: data}))
//         .catch(err => console.log(err));
// });
//
// //add Suggested Answer to its array
// router.put('/addSuggestedAnswer', (req, res, next) =>{
//     // console.log(req.body);
//     surveyService.addSuggestedAnswer(req)
//         .then(data => res.status(200).json({data : data}))
//         .catch(err => console.log(err));
// });
//
// //remove suggested answer from back
// router.put('/removeSuggestedBack', (req, res, next) =>{
//     surveyService.removeSuggestedFromBack(req)
//         .then(data => res.status(200).json({data : data}))
//         .catch(err => console.log(err));
// });
//
// //remove suggested answer from front
// router.put('/removeSuggestedFront', (req, res, next) =>{
//     surveyService.removeSuggestedFromFront(req)
//         .then(data => res.status(200).json({data : data}))
//         .catch(err => console.log(err));
// });
//
// // update answers counters
// router.put('/updateAnswers', (req, res, next)=>{
//     surveyService.updateAnswersCounters(req)
//         .then(data => res.status(200).json({data:data}))
//         .catch(err => console.log(err));
// });
//
//
//
// // delete property
// router.post('/deleteProperty', (req,res,next)=>{
//     surveyService.deleteProperty(req, req.body.propertyName)
//         .then(data => res.status(200).json({data : data}))
//         .catch(err => console.log(err));
// });
// // insert dummy data
// router.post('/addDummy', (req, res, next) => {
//     surveyService.insertDummy(req)
//         .then(data => res.status(200).json({data:data}))
//         .catch(err => console.log(err));
// });

module.exports = router;