const { Router } = require("express");
const groupStuffs = Router();

const {
  postGroupStuff,
  getGroupStuffs,
  deleteGroupStuff,
} = require("../controllers/groupStuff.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postGroupStuffValidation,
} = require("../validation/groupStuff.validation");

/**
 * @swagger
 * tags:
 *   name: GroupStuffs
 *   description: GroupStuff pivot management endpoints
 */

/**
 * @swagger
 * /group-stuffs/create:
 *   post:
 *     summary: Create group stuff relation
 *     tags: [GroupStuffs]
 *     description: Assign staff to a group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: string
 *               stuff_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Group stuff relation created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
groupStuffs.post(
  "/create",
  validationSchema(postGroupStuffValidation),
  postGroupStuff,
);

/**
 * @swagger
 * /group-stuffs/getGroupStuffs:
 *   get:
 *     summary: Get all group stuffs
 *     tags: [GroupStuffs]
 *     description: Retrieve list of group stuff relations
 *     responses:
 *       '200':
 *         description: Group stuffs retrieved successfully
 *       '500':
 *         description: Internal server error
 */
groupStuffs.get("/getGroupStuffs", getGroupStuffs);

/**
 * @swagger
 * /group-stuffs/deleteGroupStuff/{id}:
 *   delete:
 *     summary: Delete group stuff relation
 *     tags: [GroupStuffs]
 *     description: Remove group stuff relation by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Group stuff deleted successfully
 *       '400':
 *         description: Relation not found
 *       '500':
 *         description: Internal server error
 */
groupStuffs.delete("/deleteGroupStuff/:id", deleteGroupStuff);

module.exports = { groupStuffs };
