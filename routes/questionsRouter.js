const express = require('express')
const { postQuestion, getQuestions } = require('../controllers/questionsController')

const router = express.Router()

// Gets all questions from database
// router.get('/all-questions', db.getQuestions)

// Set it up as a get request to quickly test what should eventually be a post request
router.post('/make-question', postQuestion)
router.get('/all-questions', getQuestions)

module.exports = router
