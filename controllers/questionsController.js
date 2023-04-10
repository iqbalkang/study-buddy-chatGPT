const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/appError');
const asyncHandler = require('express-async-handler');
const Question = require('../models/questionModel');
const sendSuccess = require('../utils/sendSuccess');
//const connectOpenAI = require('../openAI/connectOpenAI')
//const answerIndex = require('../utils/answerIndex')


const saveQuestion = asyncHandler(async (req, res, next) => {
  const question = req.body;
  question.option1 = question.choices[0] ? question.choices[0] : null;
  question.option2 = question.choices[1] ? question.choices[1] : null;
  question.option3 = question.choices[2] ? question.choices[2] : null;
  question.option4 = question.choices[3] ? question.choices[3] : null;

  const questionObj = new Question(question);
  const newQuestion = await questionObj.save();

  if (newQuestion) sendSuccess(res, newQuestion);
})


const getQuestions = asyncHandler(async (req, res, next) => {
  
  const questions = await Question.find();
  sendSuccess(res, questions);
})

const getQuestion = asyncHandler(async (req, res, next) => {
  const { questionId } = req.params
  
  const question = await Question.findById(questionId);
  sendSuccess(res, question);
})

const updateQuestion = asyncHandler(async (req, res, next) => {
  const { questionId } = req.params;
 
  const question = req.body;
  question.option1 = question.choices[0] ? question.choices[0] : null;
  question.option2 = question.choices[1] ? question.choices[1] : null;
  question.option3 = question.choices[2] ? question.choices[2] : null;
  question.option4 = question.choices[3] ? question.choices[3] : null;

  const questionObj = new Question(question);
  await questionObj.update(questionId);
  sendSuccess(res, 'Question updated successfully');
})

const deleteQuestion = asyncHandler(async (req, res, next) => {
  const { questionId } = req.params;

  await Question.delete(questionId);
  sendSuccess(res, 'Question deleted successfully');
})


module.exports = {
  saveQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
}
