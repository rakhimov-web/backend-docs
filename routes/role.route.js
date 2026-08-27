const { Router } = require("express");
const roles = Router();

const {
  postRole,
  getRoleById,
  getRoles,
  updateRole,
  deleteRole,
} = require("../controllers/role.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postRoleValidation,
  updateRoleValidation,
} = require("../validation/role.validation");

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 */

/**
 * @swagger
 * /roles/create:
 *   post:
 *     summary: Create role
 *     tags: [Roles]
 *     description: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Role created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
roles.post("/create", validationSchema(postRoleValidation), postRole);

/**
 * @swagger
 * /roles/getRoles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     description: Retrieve list of roles
 *     responses:
 *       '200':
 *         description: Roles retrieved successfully
 *       '500':
 *         description: Internal server error
 */
roles.get("/getRoles", getRoles);

/**
 * @swagger
 * /roles/updateRole/{id}:
 *   put:
 *     summary: Update role
 *     tags: [Roles]
 *     description: Update role data by ID
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
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Role updated successfully
 *       '400':
 *         description: Role not found or validation error
 *       '500':
 *         description: Internal server error
 */
roles.put(
  "/updateRole/:id",
  validationSchema(updateRoleValidation),
  updateRole,
);

/**
 * @swagger
 * /roles/getRoleById/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     description: Retrieve single role details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role retrieved successfully
 *       '400':
 *         description: Role not found
 *       '500':
 *         description: Internal server error
 */
roles.get("/getRoleById/:id", getRoleById);

/**
 * @swagger
 * /roles/deleteRole/{id}:
 *   delete:
 *     summary: Delete role
 *     tags: [Roles]
 *     description: Remove role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role deleted successfully
 *       '400':
 *         description: Role not found
 *       '500':
 *         description: Internal server error
 */
roles.delete("/deleteRole/:id", deleteRole);

module.exports = { roles };
