var express = require('express');
var router = express.Router();
const surveyService = require('../service/surveyService');

/* GET home page. */
router.get('/getSurveyByID', (req, res, next) => {
    surveyService.getSurveyByID(req, 1)
        .then(data => res.status(200).json({data: data}))
        .catch(err => console.log(err))
    })


module.exports = router;
