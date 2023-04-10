const db = require('../utils/connectDB');

class Subject {
  constructor(subject) {
    this.subject = subject;
  }

  async save() {
    const query = `INSERT INTO subject (subject)
                   VALUES ($1) RETURNING *`;

    const values = [this.subject];
    const data = await db.query(query, values);
    return data.rows[0];
  }

  static async find() {
    const query = `SELECT id, subject FROM subject`;

    const data = await db.query(query);
    return data.rows;
  }

  static async findById(id) {
    const query = `SELECT id, subject
                  FROM subject
                  WHERE id = $1`;
    const values = [id];

    const data = await db.query(query, values);
    return data.rows[0];
  }

  static async findIDBySubject(subject) {

    const query = {
      text: 'SELECT * FROM subject WHERE LOWER(subject) = $1',
      values: [subject.toLowerCase()],
    };

    console.log('before query', subject);
    
    const data = await db.query(query);
    
    if (data.rows.length === 0) {
      // create new subject
        const createQuery = {
          text: 'INSERT INTO subject (subject) VALUES ($1) RETURNING *',
          values: [subject],
        };
        const newData = await db.query(createQuery);
        console.log('newData', newData);
        return newData.rows[0];
    }
    return data.rows[0];
  }
}

module.exports = Subject;
