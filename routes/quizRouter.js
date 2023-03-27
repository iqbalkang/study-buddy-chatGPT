const express = require('express')
const { generateQuiz, saveQuiz, updateQuiz, deleteQuiz } = require('../controllers/quizController')
const { loginUser, registerUser, updateUser, getUser } = require('../controllers/usersController')

const router = express.Router()

// GET
// /api/v1/quiz/:subject?difficulty=1&quest_num=10&type=”mcq”
// /api/v1/quiz/:id
// /api/v1/quiz:id/question     for getting questions
router.get('/:subject', generateQuiz)

// POST
// /api/v1/quiz
router.post('/', saveQuiz)

// PUT
// /api/v1/quiz/:id
router.put('/:quizId', updateQuiz)

// DELETE
// /api/v1/quiz/:id
router.delete('/:quizId', deleteQuiz)

module.exports = router
