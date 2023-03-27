const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Question = require('../models/QuestionModel')
const connectOpenAI = require('../openAI/connectOpenAI')
const answerIndex = require('../utils/answerIndex')

const generateQuiz = asyncHandler(async (req, res, next) => {
  const { subject } = req.params

  // /api/v1/quiz/:subject?difficulty=1&quest_num=10&type=”mcq”
  const { difficulty, quest_num, type } = req.query
})

const saveQuiz = asyncHandler(async (req, res, next) => {
  console.log('quiz has been saved to the database')
})

const updateQuiz = asyncHandler(async (req, res, next) => {
  const { quizId } = req.params
  console.log(quizId)
})

const deleteQuiz = asyncHandler(async (req, res, next) => {
  const { quizId } = req.params
  console.log(quizId)
})

module.exports = { generateQuiz, saveQuiz, updateQuiz, deleteQuiz }
