const { Router } = require("express");
const stages = Router();

const {
  postStage,
  getStageById,
  getStages,
  updateStage,
  deleteStage,
} = require("../controllers/stage.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postStageValidation,
  updateStageValidation,
} = require("../validation/stage.validation");

/**
 * @swagger
 * tags:
 *   name: Stages
 *   description: Stage management endpoints
 */

/**
 * @swagger
 * /stages/create:
 *   post:
 *     summary: Create stage
 *     tags: [Stages]
 *     description: Create a new stage
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
 *         description: Stage created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
stages.post("/create", validationSchema(postStageValidation), postStage);

/**
 * @swagger
 * /stages/getStages:
 *   get:
 *     summary: Get all stages
 *     tags: [Stages]
 *     description: Retrieve list of stages
 *     responses:
 *       '200':
 *         description: Stages retrieved successfully
 *       '500':
 *         description: Internal server error
 */
stages.get("/getStages", getStages);

/**
 * @swagger
 * /stages/updateStage/{id}:
 *   put:
 *     summary: Update stage
 *     tags: [Stages]
 *     description: Update stage data by ID
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
 *         description: Stage updated successfully
 *       '400':
 *         description: Stage not found or validation error
 *       '500':
 *         description: Internal server error
 */
stages.put(
  "/updateStage/:id",
  validationSchema(updateStageValidation),
  updateStage,
);

/**
 * @swagger
 * /stages/getStageById/{id}:
 *   get:
 *     summary: Get stage by ID
 *     tags: [Stages]
 *     description: Retrieve single stage details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stage retrieved successfully
 *       '400':
 *         description: Stage not found
 *       '500':
 *         description: Internal server error
 */
stages.get("/getStageById/:id", getStageById);

/**
 * @swagger
 * /stages/deleteStage/{id}:
 *   delete:
 *     summary: Delete stage
 *     tags: [Stages]
 *     description: Remove stage by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stage deleted successfully
 *       '400':
 *         description: Stage not found
 *       '500':
 *         description: Internal server error
 */
stages.delete("/deleteStage/:id", deleteStage);

module.exports = { stages };
