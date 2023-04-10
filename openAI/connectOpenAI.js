const { Configuration, OpenAIApi } = require('openai');
//const { templateMCQ } = require('./templates')
const { generatePrompt } = require('./generatePrompt');

//require('dotenv').config()

// Configuration for openai
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

// Talking to openai
const connectOpenAI = async (quest_num, quest_type, difficulty, subject) => {
  const prompt = generatePrompt(quest_num, quest_type, difficulty, subject);
  console.log(prompt);
  
  const chat = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a quiz making bot.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    top_p: 1,
  });
  return chat.data.choices[0].message.content;
};

module.exports = connectOpenAI;
