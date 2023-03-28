const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Question = require('../models/QuestionModel')
const connectOpenAI = require('../openAI/connectOpenAI')
const { parsingMCQ } = require('../utils/regex')

const saveQuestion = asyncHandler(async (req, res, next) => {
  const chat = await connectOpenAI()

  const content = chat.data.choices[0].message.content.replace(/\n/g, 'NEwlInE')
  const {question, option1, option2, option3, option4, answer} = parsingMCQ(content, 1)

  const questionObj = new Question('mcq', 1, question, option1, option2, option3, option4, answer, 5)
  const newQuestion = await questionObj.save()

  console.log(newQuestion)

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    question: newQuestion,
  })
})

const getQuestions = asyncHandler(async (req, res, next) => {
  const questions = await Question.find()

  res.status(StatusCodes.OK).json({
    status: 'success',
    questions,
  })
})

const getQuestion = asyncHandler(async (req, res, next) => {
  const { questionId } = req.params
  console.log(questionId)
})

const updateQuestion = asyncHandler(async (req, res, next) => {
  const { questionId } = req.params
  console.log(questionId)
})

const deleteQuestion = asyncHandler(async (req, res, next) => {
  const { questionId } = req.params
  console.log(questionId)
})

module.exports = {
  saveQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
}
