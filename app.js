const express = require('express')
const { StatusCodes } = require('http-status-codes')
const cors = require('cors')
require('dotenv').config()

// Error Handlers
const AppError = require('./utils/appError')
const errorHandler = require('./controllers/errorsController')

// Routers
const authRouter = require('./routes/authRouter')
const questionsRouter = require('./routes/questionsRouter')

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

// API Routes
app.use('/auth', authRouter)
app.use('/questions', questionsRouter)

app.use('*', (req, res, next) => {
  return next(new AppError(`Could not find ${req.originalUrl}`, StatusCodes.NOT_FOUND))
})

// global error handler
app.use(errorHandler)

// Start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
