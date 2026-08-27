const { Router } = require("express");
const studentGroups = Router();

const {
  postStudentGroup,
  getStudentGroups,
  deleteStudentGroup,
} = require("../controllers/studentGroup.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postStudentGroupValidation,
} = require("../validation/studentGroup.validation");

/**
 * @swagger
 * tags:
 *   name: StudentGroups
 *   description: StudentGroup pivot management endpoints
 */

/**
 * @swagger
 * /student-groups/create:
 *   post:
 *     summary: Create student group relation
 *     tags: [StudentGroups]
 *     description: Assign a student to a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               group_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Student group created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
studentGroups.post(
  "/create",
  validationSchema(postStudentGroupValidation),
  postStudentGroup,
);

/**
 * @swagger
 * /student-groups/getStudentGroups:
 *   get:
 *     summary: Get all student groups
 *     tags: [StudentGroups]
 *     description: Retrieve list of student group relations
 *     responses:
 *       '200':
 *         description: Student groups retrieved successfully
 *       '500':
 *         description: Internal server error
 */
studentGroups.get("/getStudentGroups", getStudentGroups);

/**
 * @swagger
 * /student-groups/deleteStudentGroup/{id}:
 *   delete:
 *     summary: Delete student group
 *     tags: [StudentGroups]
 *     description: Remove student group relation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Student group deleted successfully
 *       '400':
 *         description: Relation not found
 *       '500':
 *         description: Internal server error
 */
studentGroups.delete("/deleteStudentGroup/:id", deleteStudentGroup);

module.exports = { studentGroups };
