const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Question = require('../models/QuestionModel')
const openai = require('../utils/connectOpenAI')
const answerIndex = require('../utils/answerIndex')

const template = `Example of a multiple choice question:\n
                    Q. What is the syntax for a for loop in Javascript?\n
                    A. for(i=0, i < 10, i++)\n
                    B.\n
                    C.\n
                    D.\n
                    Answer: B\n\n
                      
                    On a scale from 1 to 10 with 10 being the hardest and 1 being the easiest, 
                    Using the formatting of the example above, 
                    generate one multiple choice 7 out of 10 difficulty javascript question.`

const postQuestion = asyncHandler(async (req, res, next) => {
  const chat = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a quiz making bot.' },
      { role: 'user', content: template },
    ],
    temperature: 0.7,
    top_p: 1,
  })
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
