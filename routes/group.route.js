const { Router } = require("express");
const groups = Router();

const {
  postGroup,
  getGroupById,
  getGroups,
  updateGroup,
  deleteGroup,
  searchGroups,
} = require("../controllers/group.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postGroupValidation,
  updateGroupValidation,
} = require("../validation/group.validation");

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: Group management endpoints
 */

/**
 * @swagger
 * /groups/create:
 *   post:
 *     summary: Create group
 *     tags: [Groups]
 *     description: Create a new group entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_name:
 *                 type: string
 *               lesson_start_time:
 *                 type: string
 *               lesson_continuous:
 *                 type: string
 *               lesson_week_day:
 *                 type: string
 *               group_stage_id:
 *                 type: string
 *               room_number:
 *                 type: string
 *               room_floor:
 *                 type: number
 *               branch_id:
 *                 type: string
 *               lessons_quant:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Group created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
groups.post("/create", validationSchema(postGroupValidation), postGroup);

/**
 * @swagger
 * /groups/getGroups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     description: Retrieve list of groups
 *     responses:
 *       '200':
 *         description: Groups retrieved successfully
 *       '500':
 *         description: Internal server error
 */
groups.get("/getGroups", getGroups);

/**
 * @swagger
 * /groups/search:
 *   get:
 *     summary: Search groups
 *     tags: [Groups]
 *     description: Search groups by query string
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Groups found
 *       '400':
 *         description: Invalid query parameter
 *       '500':
 *         description: Internal server error
 */
groups.get("/search", searchGroups);

/**
 * @swagger
 * /groups/updateGroup/{id}:
 *   put:
 *     summary: Update group
 *     tags: [Groups]
 *     description: Update group data by ID
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
 *               group_name:
 *                 type: string
 *               lesson_start_time:
 *                 type: string
 *               lesson_continuous:
 *                 type: string
 *               lesson_week_day:
 *                 type: string
 *               group_stage_id:
 *                 type: string
 *               room_number:
 *                 type: string
 *               room_floor:
 *                 type: number
 *               branch_id:
 *                 type: string
 *               lessons_quant:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Group updated successfully
 *       '400':
 *         description: Group not found or validation error
 *       '500':
 *         description: Internal server error
 */
groups.put(
  "/updateGroup/:id",
  validationSchema(updateGroupValidation),
  updateGroup,
);

/**
 * @swagger
 * /groups/getGroupById/{id}:
 *   get:
 *     summary: Get group by ID
 *     tags: [Groups]
 *     description: Retrieve single group details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group retrieved successfully
 *       '400':
 *         description: Group not found
 *       '500':
 *         description: Internal server error
 */
groups.get("/getGroupById/:id", getGroupById);

/**
 * @swagger
 * /groups/deleteGroup/{id}:
 *   delete:
 *     summary: Delete group
 *     tags: [Groups]
 *     description: Remove group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group deleted successfully
 *       '400':
 *         description: Group not found
 *       '500':
 *         description: Internal server error
 */
groups.delete("/deleteGroup/:id", deleteGroup);

module.exports = { groups };
