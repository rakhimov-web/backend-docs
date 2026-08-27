const { Router } = require("express");
const stuffRoles = Router();

const {
  postStuffRole,
  getStuffRoles,
  deleteStuffRole,
} = require("../controllers/stuffRole.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postStuffRoleValidation,
} = require("../validation/stuffRole.validation");

/**
 * @swagger
 * tags:
 *   name: StuffRoles
 *   description: StuffRole pivot management endpoints
 */

/**
 * @swagger
 * /stuff-roles/create:
 *   post:
 *     summary: Create stuff role relation
 *     tags: [StuffRoles]
 *     description: Assign a role to a staff member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stuff_id:
 *                 type: string
 *               role_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Stuff role relation created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
stuffRoles.post(
  "/create",
  validationSchema(postStuffRoleValidation),
  postStuffRole,
);

/**
 * @swagger
 * /stuff-roles/getStuffRoles:
 *   get:
 *     summary: Get all stuff roles
 *     tags: [StuffRoles]
 *     description: Retrieve list of stuff role relations
 *     responses:
 *       '200':
 *         description: Stuff roles retrieved successfully
 *       '500':
 *         description: Internal server error
 */
stuffRoles.get("/getStuffRoles", getStuffRoles);

/**
 * @swagger
 * /stuff-roles/deleteStuffRole/{id}:
 *   delete:
 *     summary: Delete stuff role relation
 *     tags: [StuffRoles]
 *     description: Remove stuff role relation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff role deleted successfully
 *       '400':
 *         description: Relation not found
 *       '500':
 *         description: Internal server error
 */
stuffRoles.delete("/deleteStuffRole/:id", deleteStuffRole);

module.exports = { stuffRoles };
