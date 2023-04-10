const express = require('express')
const {
  getSubjects,
  getQuizBySubject,
} = require("../controllers/subjectController");

const router = express.Router()

// GET
// /api/v1/subject
// /api/v1/subject/:id/quiz
router.get('/', getSubjects)
router.get('/:id/quiz', getQuizBySubject)

module.exports = router
