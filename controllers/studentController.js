const studentModel = require('../models/studentModel');
const { studentSchema } = require('../validations/studentValidation');

const createStudent = async (req, res) => {
  const { error, value } = studentSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const student = await studentModel.createStudent(value);
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert student" });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await studentModel.getAllStudents();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await studentModel.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch student" });
  }
};

const updateStudent = async (req, res) => {
  const { error, value } = studentSchema.validate(req.body, { presence: "optional" });
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const student = await studentModel.updateStudent(req.params.id, value);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update student" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await studentModel.deleteStudent(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete student" });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
};
