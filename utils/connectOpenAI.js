const { Configuration, OpenAIApi } = require('openai')
const { templateMCQ } = require('./templates')

require('dotenv').config()

// Configuration for openai
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
})
const openai = new OpenAIApi(configuration)

// Talking to openai
const connectOpenAI = async () => {
  return await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a quiz making bot.' },
      { role: 'user', content: templateMCQ },
    ],
    temperature: 0.7,
    top_p: 1,
  })
}

module.exports = connectOpenAI
