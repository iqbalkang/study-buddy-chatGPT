const db = require('../utils/connectDB')

class Question {
  constructor(type, subject_id, question, option1, option2, option3, option4, answer, difficulty) {
    this.type = type
    this.subject_id = subject_id
    this.question = question
    this.option1 = option1
    this.option2 = option2
    this.option3 = option3
    this.option4 = option4
    this.answer = answer
    this.difficulty = difficulty
  }

  async save() {
    const query = `INSERT INTO questions (type, subject_id, question, option1, option2, option3, option4, answer, difficulty)
                   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`

    const values = [
      this.type,
      this.subject_id,
      this.question,
      this.option1,
      this.option2,
      this.option3,
      this.option4,
      this.answer,
      this.difficulty,
    ]
    const data = await db.query(query, values)
    return data.rows[0]
  }

  static async find() {
    const query = `SELECT id, type, subject_id, ARRAY[option1, option2, option3, option4] as choices, answer 
    FROM questions`

    const data = await db.query(query)
    return data.rows[0]
  }
}

module.exports = Question
