const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')
const Question = require('../models/QuestionModel')
const connectOpenAI = require('../openAI/connectOpenAI')
const answerIndex = require('../utils/answerIndex')

const getCohorts = asyncHandler(async (req, res, next) => {
  console.log('all cohorts')
})

const getCohort = asyncHandler(async (req, res, next) => {
  const { cohortId } = req.params
  console.log(cohortId)
})

const saveCohort = asyncHandler(async (req, res, next) => {
  console.log('cohort has been saved')
})

const updateCohort = asyncHandler(async (req, res, next) => {
  const { cohortId } = req.params
  console.log(cohortId)
})

const deleteCohort = asyncHandler(async (req, res, next) => {
  const { cohortId } = req.params
  console.log(cohortId)
})

module.exports = { getCohorts, getCohort, saveCohort, updateCohort, deleteCohort }
