const { Router } = require("express");
const lidStatuses = Router();

const {
  postLidStatus,
  getLidStatusById,
  getLidStatuses,
  updateLidStatus,
  deleteLidStatus,
} = require("../controllers/lidStatus.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postLidStatusValidation,
  updateLidStatusValidation,
} = require("../validation/lidStatus.validation");

/**
 * @swagger
 * tags:
 *   name: LidStatuses
 *   description: Lid status management endpoints
 */

/**
 * @swagger
 * /lid-statuses/create:
 *   post:
 *     summary: Create lid status
 *     tags: [LidStatuses]
 *     description: Create a new lid status
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Lid status created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
lidStatuses.post(
  "/create",
  validationSchema(postLidStatusValidation),
  postLidStatus,
);

/**
 * @swagger
 * /lid-statuses/getLidStatuses:
 *   get:
 *     summary: Get all lid statuses
 *     tags: [LidStatuses]
 *     description: Retrieve list of lid statuses
 *     responses:
 *       '200':
 *         description: Lid statuses retrieved successfully
 *       '500':
 *         description: Internal server error
 */
lidStatuses.get("/getLidStatuses", getLidStatuses);

/**
 * @swagger
 * /lid-statuses/updateLidStatus/{id}:
 *   put:
 *     summary: Update lid status
 *     tags: [LidStatuses]
 *     description: Update lid status data by ID
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
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Lid status updated successfully
 *       '400':
 *         description: Lid status not found or validation error
 *       '500':
 *         description: Internal server error
 */
lidStatuses.put(
  "/updateLidStatus/:id",
  validationSchema(updateLidStatusValidation),
  updateLidStatus,
);

/**
 * @swagger
 * /lid-statuses/getLidStatusById/{id}:
 *   get:
 *     summary: Get lid status by ID
 *     tags: [LidStatuses]
 *     description: Retrieve single lid status details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid status retrieved successfully
 *       '400':
 *         description: Lid status not found
 *       '500':
 *         description: Internal server error
 */
lidStatuses.get("/getLidStatusById/:id", getLidStatusById);

/**
 * @swagger
 * /lid-statuses/deleteLidStatus/{id}:
 *   delete:
 *     summary: Delete lid status
 *     tags: [LidStatuses]
 *     description: Remove lid status by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid status deleted successfully
 *       '400':
 *         description: Lid status not found
 *       '500':
 *         description: Internal server error
 */
lidStatuses.delete("/deleteLidStatus/:id", deleteLidStatus);

module.exports = { lidStatuses };
