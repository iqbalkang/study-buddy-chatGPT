const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./queries.cjs')

require('dotenv').config()
const app = express()
const port = process.env.PORT

const corsOptions = {
  origin: '*',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(bodyParser.json())

// Just to check if express is setup correctly
app.get('/', (req, res) => {
  res.json({ info: 'node.js, express, and postgresql API' })
})

// // Gets all Users from database
// app.get('/all-users', db.getUsers)

// // Gets all questions from database
// app.get('/all-questions', db.getQuestions)

// // Set it up as a get request to quickly test what should eventually be a post request
// app.get('/make-question', db.postQuestion)

// // Start the Express server
// app.listen(port, () => {
//   console.log(`server started at http://localhost:${port}`)
// })
