const { Router } = require("express");
const students = Router();

const {
  postStudent,
  getStudentById,
  getStudents,
  updateStudent,
  deleteStudent,
  searchStudents,
} = require("../controllers/student.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postStudentValidation,
  updateStudentValidation,
} = require("../validation/student.validation");

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management endpoints
 */

/**
 * @swagger
 * /students/create:
 *   post:
 *     summary: Create student
 *     tags: [Students]
 *     description: Create a new student entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lid_id:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *     responses:
 *       '201':
 *         description: Student created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
students.post("/create", validationSchema(postStudentValidation), postStudent);

/**
 * @swagger
 * /students/getStudents:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     description: Retrieve list of students
 *     responses:
 *       '200':
 *         description: Students retrieved successfully
 *       '500':
 *         description: Internal server error
 */
students.get("/getStudents", getStudents);

/**
 * @swagger
 * /students/search:
 *   get:
 *     summary: Search students
 *     tags: [Students]
 *     description: Search students by query string
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Students found
 *       '400':
 *         description: Invalid query parameter
 *       '500':
 *         description: Internal server error
 */
students.get("/search", searchStudents);

/**
 * @swagger
 * /students/updateStudent/{id}:
 *   put:
 *     summary: Update student
 *     tags: [Students]
 *     description: Update student data by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lid_id:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *     responses:
 *       '200':
 *         description: Student updated successfully
 *       '400':
 *         description: Student not found or validation error
 *       '500':
 *         description: Internal server error
 */
students.put("/updateStudent/:id", validationSchema(updateStudentValidation), updateStudent);

/**
 * @swagger
 * /students/getStudentById/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     description: Retrieve single student details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Student retrieved successfully
 *       '400':
 *         description: Student not found
 *       '500':
 *         description: Internal server error
 */
students.get("/getStudentById/:id", getStudentById);

/**
 * @swagger
 * /students/deleteStudent/{id}:
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 *     description: Remove student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Student deleted successfully
 *       '400':
 *         description: Student not found
 *       '500':
 *         description: Internal server error
 */
students.delete("/deleteStudent/:id", deleteStudent);

module.exports = { students };