const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Question = require('../models/QuestionModel')
const connectOpenAI = require('../utils/connectOpenAI')
const answerIndex = require('../utils/answerIndex')

const postQuestion = asyncHandler(async (req, res, next) => {
  const chat = await connectOpenAI()

  const content = chat.data.choices[0].message.content.replace(/\n/g, 'NEwlInE')
  const question = content.match(/^Q\..*?(?=A\.)/g)[0].replace(/NEwlInE/g, '\n')
  const option1 = content
    .match(/A\..*?(?=B\.)/g)[0]
    .replace(/NEwlInE/g, '')
    .replace(/A\./, '')
    .trim()
  const option2 = content
    .match(/B\..*?(?=C\.)/g)[0]
    .replace(/NEwlInE/g, '')
    .replace(/B\./, '')
    .trim()
  const option3 = content
    .match(/C\..*?(?=D\.)/g)[0]
    .replace(/NEwlInE/g, '')
    .replace(/C\./, '')
    .trim()
  const option4 = content
    .match(/D\..*?(?=Answer)/g)[0]
    .replace(/NEwlInE/g, '')
    .replace(/D\./, '')
    .trim()
  const answer = answerIndex(
    content
      .match(/Answer:.*/g)[0]
      .replace(/Answer:/g, '')
      .trim()
  )

  const questionObj = new Question('mcq', 1, question, option1, option2, option3, option4, answer, 5)
  const newQuestion = await questionObj.save()

  console.log(newQuestion)

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    question: newQuestion,
  })
})

const getQuestions = asyncHandler(async (req, res, next) => {
  // const
})

module.exports = {
  postQuestion,
  getQuestions,
}
