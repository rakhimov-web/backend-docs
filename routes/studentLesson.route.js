const { Router } = require("express");
const studentLessons = Router();

const {
  postStudentLesson,
  getStudentLessons,
  updateStudentLesson,
} = require("../controllers/studentLesson.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postStudentLessonValidation,
  updateStudentLessonValidation,
} = require("../validation/studentLesson.validation");

/**
 * @swagger
 * tags:
 *   name: StudentLessons
 *   description: StudentLesson attendance management endpoints
 */

/**
 * @swagger
 * /student-lessons/create:
 *   post:
 *     summary: Create student lesson attendance
 *     tags: [StudentLessons]
 *     description: Record attendance for a student lesson
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               lesson_id:
 *                 type: string
 *               is_there:
 *                 type: boolean
 *               reason:
 *                 type: string
 *               be_paid:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Student lesson created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
studentLessons.post(
  "/create",
  validationSchema(postStudentLessonValidation),
  postStudentLesson,
);

/**
 * @swagger
 * /student-lessons/getStudentLessons:
 *   get:
 *     summary: Get all student lessons
 *     tags: [StudentLessons]
 *     description: Retrieve list of student lesson attendances
 *     responses:
 *       '200':
 *         description: Student lessons retrieved successfully
 *       '500':
 *         description: Internal server error
 */
studentLessons.get("/getStudentLessons", getStudentLessons);

/**
 * @swagger
 * /student-lessons/updateStudentLesson/{id}:
 *   put:
 *     summary: Update student lesson attendance
 *     tags: [StudentLessons]
 *     description: Update student lesson data by ID
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
 *               is_there:
 *                 type: boolean
 *               reason:
 *                 type: string
 *               be_paid:
 *                 type: boolean
 *               reason:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Student lesson updated successfully
 *       '400':
 *         description: Student lesson not found or validation error
 *       '500':
 *         description: Internal server error
 */
studentLessons.put(
  "/updateStudentLesson/:id",
  validationSchema(updateStudentLessonValidation),
  updateStudentLesson,
);

module.exports = { studentLessons };
