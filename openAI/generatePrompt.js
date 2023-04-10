const template = require('./templates');

const generatePrompt = (quest_num, quest_type, difficulty, subject) => {
  //console.log(template.mcqTemplate);
  switch (quest_type) {
    case 'mcq':
      return (
        template.mcqTemplate +
        template.customTemplate(
          quest_num,
          'multiple choice',
          difficulty,
          subject
        )
      );
    case 'tf':
      return (
        template.tfTemplate +
        template.customTemplate(quest_num, 'true or false', difficulty, subject)
      );
    default:
      return (
        template.mcqTemplate +
        template.customTemplate(
          quest_num,
          'multiple choice',
          difficulty,
          subject
        )
      );
  }
}

module.exports = { generatePrompt };
