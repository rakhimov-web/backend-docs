const { Router } = require("express");
const role = Router();

const { postRole } = require("../controllers/role.controller");

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role detection
 */

/**
 * @swagger
 * /role/postRole:
 *   post:
 *     summary: Post role
 *     tags: [Role]
 *     description: Posting user's role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: Enter one of three roles
 *     responses:
 *       '201':
 *         description: Role posted successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */

role.post("/postRole", postRole);

module.exports = { role };
