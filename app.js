const express = require('express');
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');
require('dotenv').config();

// Error Handlers
const AppError = require('./utils/appError');
const errorHandler = require('./controllers/errorsController');

// Routers
const userRouter = require('./routes/userRouter');
const questionsRouter = require('./routes/questionsRouter');
const quizRouter = require('./routes/quizRouter');
const subjectRouter = require('./routes/subjectRouter');
const cohortRouter = require('./routes/cohortRouter');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/v1', userRouter);
app.use('/api/v1/quiz', quizRouter);
app.use('/api/v1/question', questionsRouter);
app.use('/api/v1/subject', subjectRouter);
app.use('/api/v1/cohort', cohortRouter);

app.use('*', (req, res, next) => {
  return next(new AppError(`Could not find ${req.originalUrl}`, StatusCodes.NOT_FOUND));
})

// global error handler
app.use(errorHandler);

// Start the Express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
})
