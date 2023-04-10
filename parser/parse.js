const QuestionFactory = require('./questionFactory');

exports.parse = (type, data) => {

  const questions = data
    .replace(/(Answer:.*)/g, '$1{%###%}')
    .split('{%###%}')
    .slice(0, -1);
 
  const parsedQuestions = questions.map( (quest, index) => {
    let question = QuestionFactory.create(type, index + 1, quest.trim());
    return question.parse();

  });

  return parsedQuestions;
}