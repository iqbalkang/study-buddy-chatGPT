const { Configuration, OpenAIApi } = require('openai')

require('dotenv').config()

// Configuration for openai
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
})
const openai = new OpenAIApi(configuration)

module.exports = openai
