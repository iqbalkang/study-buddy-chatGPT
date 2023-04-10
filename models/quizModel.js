const db = require('../utils/connectDB');

class Quiz {
  constructor({ 
    subject_id,
    created_by_id,
    difficulty,
    no_of_questions,
    questions,
    module,
    description
  }) {
    this.subject_id = subject_id;
    this.created_by_id = created_by_id;
    this.difficulty = difficulty;
    this.no_of_questions = no_of_questions;
    this.questions = questions;
    this.module = module;
    this.description = description;
  }

  async save() {
    const query = {
      text: `INSERT INTO quiz (subject_id, created_by_id, difficulty, no_of_questions, questions, module, description)
             VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      values: [
        this.subject_id,
        this.created_by_id,
        this.difficulty,
        this.no_of_questions,
        this.questions,
        this.module,
        this.description,
      ],
    };

    const data = await db.query(query);
    return data.rows[0];
  }

  async update(quizId) {

    const query = {
      text: `UPDATE quiz SET
              subject_id = $1,
              difficulty = $2, 
              no_of_questions = $3, 
              questions = $4, 
              module = $5, 
              description = $6
            WHERE id = $7`,
      values: [
        this.subject_id,
        this.difficulty,
        this.no_of_questions,
        this.questions,
        this.module,
        this.description,
        quizId,
      ],
    };

    await db.query(query);

    //return data.rows[0];
  }

  static async find() {
    const query = {
      text: `SELECT 
              q.id, 
              q.subject_id, 
              s.subject, 
              q.created_by_id, 
              u.first_name || ' ' || u.last_name AS created_by,
              q.created_at, 
              q.difficulty, 
              q.no_of_questions,
              q.questions, 
              q.module, 
              q.description
            FROM quiz q
            INNER JOIN subject s ON q.subject_id = s.id
            INNER JOIN users u ON q.created_by_id = u.id`,
    };

    const data = await db.query(query);
    return data.rows;
  }

  static async findById(id) {
    const query = {
      text: `SELECT 
              q.id, 
              q.subject_id, 
              s.subject, 
              q.created_by_id, 
              u.first_name || ' ' || u.last_name AS created_by,
              q.created_at, 
              q.difficulty, 
              q.no_of_questions,
              q.questions, 
              q.module, 
              q.description
            FROM quiz q
            INNER JOIN subject s ON q.subject_id = s.id
            INNER JOIN users u ON q.created_by_id = u.id
            WHERE q.id = $1`,
      values: [id],
    };
    const data = await db.query(query);
    return data.rows[0];
  }

  static async findBySubjectId(subjectId) {
    const query = {
      text: `SELECT 
              q.id, 
              q.subject_id, 
              s.subject, 
              q.created_by_id, 
              u.first_name || ' ' || u.last_name AS created_by,
              q.created_at, 
              q.difficulty, 
              q.no_of_questions,
              q.questions, 
              q.module, 
              q.description
            FROM quiz q
            INNER JOIN subject s ON q.subject_id = s.id
            INNER JOIN users u ON q.created_by_id = u.id
            WHERE q.subject_id = $1`,
      values: [subjectId],
    };

    const data = await db.query(query);
    return data.rows;
  }

  static async delete(id) {
    const query = {
      text: `DELETE FROM quiz WHERE id = $1`,
      values: [id],
    };

    await db.query(query);
  }
}

module.exports = Quiz;
