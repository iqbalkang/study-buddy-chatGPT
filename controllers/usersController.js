const { StatusCodes } = require('http-status-codes')
const AppError = require('../utils/appError')
const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler(async (req, res, next) => {
  console.log('register user')
})

const loginUser = asyncHandler(async (req, res, next) => {
  console.log('login user')
})

const updateUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  console.log(userId)
})

const getUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params
  console.log(userId)
})

module.exports = { loginUser, registerUser, updateUser, getUser }
