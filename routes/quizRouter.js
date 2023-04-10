const express = require('express');
const { generateQuiz, getQuiz, saveQuiz, updateQuiz, deleteQuiz } = require('../controllers/quizController');
const { loginUser, registerUser, updateUser, getUser } = require('../controllers/usersController');

const router = express.Router();

// GET
// /api/v1/quiz?subject=javascript&difficulty=1&quest_num=10&type=mcq
// /api/v1/quiz/:id
// /api/v1/subject/:id/quiz   
router.get('/', generateQuiz);
router.get('/:id', getQuiz);

// POST
// POST /api/v1/quiz
router.post('/', saveQuiz);

// PUT
// /api/v1/quiz/:id
router.put('/:id', updateQuiz);

// DELETE
// /api/v1/quiz/:id
router.delete('/:id', deleteQuiz);

module.exports = router;
