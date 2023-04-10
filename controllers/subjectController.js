const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/appError');
const asyncHandler = require('express-async-handler');
const Subject = require('../models/subjectModel');
const Quiz = require('../models/quizModel');
const sendSuccess = require('../utils/sendSuccess');


const getSubjects = asyncHandler(async (req, res, next) => {
  const subjects = await Subject.find();

  sendSuccess(res, subjects);
});

const getQuizBySubject = asyncHandler(async (req, res, next) => {
  const { id: subjectId } = req.params;

  const quiz = await Quiz.findBySubjectId(subjectId);
  
  sendSuccess(res, quiz);
});

module.exports = {
  getSubjects,
  getQuizBySubject
};
