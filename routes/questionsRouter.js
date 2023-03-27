const express = require('express')
const {
  getQuestions,
  getQuestion,
  deleteQuestion,
  updateQuestion,
  saveQuestion,
} = require('../controllers/questionsController')

const router = express.Router()

// POST
// /api/v1/question
router.post('/', saveQuestion)

// GET
// /api/v1/question/:id
router.get('/', getQuestions)
router.get('/:questionId', getQuestion)

// PUT
// /api/v1/question/:id
router.put('/:questionId', updateQuestion)

// DELETE
// /api/v1/question/:id
router.delete('/:questionId', deleteQuestion)

module.exports = router
