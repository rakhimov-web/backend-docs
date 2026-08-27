const { Router } = require("express");
const lessons = Router();

const {
  postLesson,
  getLessonById,
  getLessons,
  updateLesson,
  deleteLesson,
  searchLessons,
} = require("../controllers/lesson.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postLessonValidation,
  updateLessonValidation,
} = require("../validation/lesson.validation");

/**
 * @swagger
 * tags:
 *   name: Lessons
 *   description: Lesson management endpoints
 */

/**
 * @swagger
 * /lessons/create:
 *   post:
 *     summary: Create lesson
 *     tags: [Lessons]
 *     description: Create a new lesson
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_theme:
 *                 type: string
 *               lesson_number:
 *                 type: number
 *               group_id:
 *                 type: string
 *               lesson_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       '201':
 *         description: Lesson created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
lessons.post("/create", validationSchema(postLessonValidation), postLesson);

/**
 * @swagger
 * /lessons/getLessons:
 *   get:
 *     summary: Get all lessons
 *     tags: [Lessons]
 *     description: Retrieve list of lessons
 *     responses:
 *       '200':
 *         description: Lessons retrieved successfully
 *       '500':
 *         description: Internal server error
 */
lessons.get("/getLessons", getLessons);

/**
 * @swagger
 * /lessons/search:
 *   get:
 *     summary: Search lessons
 *     tags: [Lessons]
 *     description: Search lessons by query string
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lessons found
 *       '400':
 *         description: Invalid query parameter
 *       '500':
 *         description: Internal server error
 */
lessons.get("/search", searchLessons);

/**
 * @swagger
 * /lessons/updateLesson/{id}:
 *   put:
 *     summary: Update lesson
 *     tags: [Lessons]
 *     description: Update lesson data by ID
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
 *               lesson_theme:
 *                 type: string
 *               lesson_number:
 *                 type: number
 *               group_id:
 *                 type: string
 *               lesson_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       '200':
 *         description: Lesson updated successfully
 *       '400':
 *         description: Lesson not found or validation error
 *       '500':
 *         description: Internal server error
 */
lessons.put(
  "/updateLesson/:id",
  validationSchema(updateLessonValidation),
  updateLesson,
);

/**
 * @swagger
 * /lessons/getLessonById/{id}:
 *   get:
 *     summary: Get lesson by ID
 *     tags: [Lessons]
 *     description: Retrieve single lesson details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lesson retrieved successfully
 *       '400':
 *         description: Lesson not found
 *       '500':
 *         description: Internal server error
 */
lessons.get("/getLessonById/:id", getLessonById);

/**
 * @swagger
 * /lessons/deleteLesson/{id}:
 *   delete:
 *     summary: Delete lesson
 *     tags: [Lessons]
 *     description: Remove lesson by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lesson deleted successfully
 *       '400':
 *         description: Lesson not found
 *       '500':
 *         description: Internal server error
 */
lessons.delete("/deleteLesson/:id", deleteLesson);

module.exports = { lessons };
