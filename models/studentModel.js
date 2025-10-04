const { pool } = require('../config/db');

const createStudent = async (data) => {
  const result = await pool.query(
    `INSERT INTO students_khalo (
      student_name, national_id, phone, whatsapp, gender, grade, date_of_entry,
      family_members, residence_location, map_link, special_needs, martyr, provider,
      relationship, war_injury, injury_details, description, registration_date
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18
    ) RETURNING *`,
    Object.values(data)
  );
  return result.rows[0];
};

const getAllStudents = async () => {
  const result = await pool.query("SELECT * FROM students_khalo");
  return result.rows;
};

const getStudentById = async (id) => {
  const result = await pool.query("SELECT * FROM students_khalo WHERE id = $1", [id]);
  return result.rows[0];
};

const updateStudent = async (id, data) => {
  const fields = Object.keys(data);
  const values = Object.values(data);
  const setQuery = fields.map((field, idx) => `${field} = $${idx + 1}`).join(", ");
  const result = await pool.query(
    `UPDATE students_khalo SET ${setQuery} WHERE id = $${fields.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

const deleteStudent = async (id) => {
  const result = await pool.query("DELETE FROM students_khalo WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
