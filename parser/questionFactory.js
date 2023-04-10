const MCQuestion = require('./mcQuestion');
const TFQuestion = require('./tfQuestion');

class QuestionFactory {
  static create(questType, questionNum, data) {
    if (questType == 'mcq') {
      return new MCQuestion(questionNum, data);
    } else if (questType == 'tf') {
      return new TFQuestion(questionNum, data);
    }
  }
}

module.exports = QuestionFactory;