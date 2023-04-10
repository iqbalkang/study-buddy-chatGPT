const db = require('../utils/connectDB');

class Question {
  constructor({
    subject_id,
    type,
    difficulty,
    question,
    answer,
    option1,
    option2,
    option3 = null,
    option4 = null,
    is_active = true
  }) {
    this.subject_id = subject_id;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.answer = answer;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.is_active = is_active;
  }

  async save() {
    const query = {
      text: `INSERT INTO question (subject_id, type, difficulty, question, answer, option1, option2, option3, option4)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      values: [
        this.subject_id,
        this.type,
        this.difficulty,
        this.question,
        this.answer,
        this.option1,
        this.option2,
        this.option3,
        this.option4,
      ],
    };

    const data = await db.query(query);
    return data.rows[0];
  }

  async update(id) {
    const query = {
      text: `UPDATE question SET
              subject_id = $1,
              type = $2,
              difficulty = $3,
              question = $4,
              answer = $5,
              option1 = $6,
              option2 = $7,
              option3 = $8,
              option4 = $9,
              is_active = $10
            WHERE id = $11`,
      values: [
        this.subject_id,
        this.type,
        this.difficulty,
        this.question,
        this.answer,
        this.option1,
        this.option2,
        this.option3,
        this.option4,
        this.is_active,
        id,
      ],
    };
    await db.query(query);
  }

  static async delete(id) {
    const query = {
      text: `UPDATE question SET
              is_active = false
             WHERE id = $1`,
      values: [id],
    };
    await db.query(query);
  }

  static async find() {
    const query = {
      text: `SELECT 
                id, 
                subject_id, 
                type, 
                difficulty,
                question, 
                answer, 
                ARRAY[option1, option2, option3, option4] as choices,
                is_active
             FROM question
             WHERE is_active = true`,
    };

    const data = await db.query(query);
    return data.rows;
  }

  static async findById(id) {
    const query = {
      text: `SELECT 
                id, 
                subject_id, 
                type, 
                difficulty,
                question, 
                answer, 
                ARRAY[option1, option2, option3, option4] as choices,
                is_active
             FROM question
             WHERE id = $1`,
      values: [id],
    };

    const data = await db.query(query);
    return data.rows[0];
  }
}

module.exports = Question;
