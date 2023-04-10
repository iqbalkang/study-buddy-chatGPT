const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/appError');
const sendSuccess = require('../utils/sendSuccess');
const asyncHandler = require('express-async-handler');

const connectOpenAI = require('../openAI/connectOpenAI');
const questionsParser = require('../parser/parse');

const Question = require('../models/questionModel');
const Subject = require('../models/subjectModel');
const Quiz = require('../models/quizModel');

// GET api/v1/quiz/:subject?difficulty=1&quest_num=10&type=mcq
const generateQuiz = asyncHandler(async (req, res, next) => {

  res.user = { id: 1 }; //for testing purposes

  const subject = req.query.subject || 'javascript';
  const difficulty = req.query.difficulty || 1;
  const quest_num = req.query.quest_num || 10;
  const type = req.query.type || 'mcq';

  // get questions from openAI
  const data = await connectOpenAI(quest_num, type, difficulty, subject);
  console.log(data);
  const questions = questionsParser.parse(type, data);

  const quizData = {
    subject: subject,
    difficulty: difficulty,
    no_of_questions: quest_num,
    questions: questions,
    description: `Subject: ${subject}, Difficulty: ${difficulty}, Number of Questions: ${quest_num} created by OpenAI`,
  };

  console.log(quizData);
  sendSuccess(res, quizData);
});


// GET api/v1/quiz/:id
const getQuiz = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  const quiz = await Quiz.findById(id);
 
  const questions = quiz.questions.map( async(questionId) => 
    await Question.findById(questionId)
  );  
  quiz.questions = await Promise.all(questions);
  
  console.log(quiz);
  sendSuccess(res, quiz);

});


// POST api/v1/quiz
// req.body = {subject, difficulty, no_of_questions, questions, module, description}
const saveQuiz = asyncHandler(async (req, res, next) => {

  res.user = { id: 1 }; //for testing purposes
  const { subject, difficulty, no_of_questions, questions } = req.body;

  // if subject is not found, create new subject
  const subjectObj = await Subject.findIDBySubject(subject);

  // save questions to database
  const questionIds = await saveQuestions(questions, subjectObj.id, difficulty);

  console.log('saved questions IDs:', questionIds);

  // save quiz to database
  const quiz = new Quiz( {
    subject_id: subjectObj.id,
    created_by_id: res.user.id,
    difficulty,
    no_of_questions,
    questions: questionIds,
    module: req.module ? req.module : null,
    description: req.description ||
      `Subject: ${subject}, Difficulty: ${difficulty}, Number of Questions: ${no_of_questions}`
  });
  const newQuiz = await quiz.save();

  newQuiz && sendSuccess(res, 'Quiz saved successfully');
});


const saveQuestions = async (questions, subjectId, difficulty) => {
  const resultQuestions = questions.map(async (quest) => {
    const { type, question, option1, option2, option3, option4, answer } =
      quest;
    const questionObj = new Question({
      subject_id: subjectId,
      type,
      difficulty,
      question,
      answer,
      option1,
      option2,
      option3,
      option4,
    });
    const savedQuest = await questionObj.save();
    //console.log('saved a question', savedQuest);
    return savedQuest.id;
  });

  return Promise.all(resultQuestions);
};


const updateQuiz = asyncHandler(async (req, res, next) => {
  const { id: quizId } = req.params;

  const quiz = req.body;

  // have to provide updating questions
  const questions = quiz.questions.map( async(question) => {
    
    question.option1 = question.choices[0] ? question.choices[0] : null;
    question.option2 = question.choices[1] ? question.choices[1] : null;
    question.option3 = question.choices[2] ? question.choices[2] : null;
    question.option4 = question.choices[3] ? question.choices[3] : null;
    
    const questionObj = new Question(question);
     
    await questionObj.update(question.id);

    return question;
  });
  const updatedQuestions = await Promise.all(questions);

  quiz.questions = updatedQuestions
    .filter((question) => question.is_active)
    .map((question) => question.id);

  console.log('update quiz', quiz);
  const quizObj = new Quiz(quiz);
  
  await quizObj.update(quiz.id);
  sendSuccess(res, 'Quiz updated successfully');
});

const deleteQuiz = asyncHandler(async (req, res, next) => {
  const { id: quizId } = req.params;

  await Quiz.delete(quizId);
  sendSuccess(res, 'Quiz deleted successfully');
});


module.exports = { generateQuiz, getQuiz, saveQuiz, updateQuiz, deleteQuiz }
