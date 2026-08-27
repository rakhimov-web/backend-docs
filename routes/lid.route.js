const { Router } = require("express");
const lids = Router();

const {
  postLid,
  getLidById,
  getLids,
  updateLid,
  deleteLid,
  searchLids,
} = require("../controllers/lid.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postLidValidation,
  updateLidValidation,
} = require("../validation/lid.validation");

/**
 * @swagger
 * tags:
 *   name: Lids
 *   description: Lid management endpoints
 */

/**
 * @swagger
 * /lids/create:
 *   post:
 *     summary: Create lid
 *     tags: [Lids]
 *     description: Create a new lead entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lid_stage_id:
 *                 type: string
 *               test_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_time:
 *                 type: string
 *               trial_lesson_group_id:
 *                 type: string
 *               lid_status_id:
 *                 type: string
 *               cancel_reason_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Lid created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
lids.post("/create", validationSchema(postLidValidation), postLid);

/**
 * @swagger
 * /lids/getLids:
 *   get:
 *     summary: Get all lids
 *     tags: [Lids]
 *     description: Retrieve list of leads
 *     responses:
 *       '200':
 *         description: Lids retrieved successfully
 *       '500':
 *         description: Internal server error
 */
lids.get("/getLids", getLids);

/**
 * @swagger
 * /lids/search:
 *   get:
 *     summary: Search lids
 *     tags: [Lids]
 *     description: Search leads by query string
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lids found
 *       '400':
 *         description: Invalid query parameter
 *       '500':
 *         description: Internal server error
 */
lids.get("/search", searchLids);

/**
 * @swagger
 * /lids/updateLid/{id}:
 *   put:
 *     summary: Update lid
 *     tags: [Lids]
 *     description: Update lead data by ID
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
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               lid_stage_id:
 *                 type: string
 *               test_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_date:
 *                 type: string
 *                 format: date
 *               trial_lesson_time:
 *                 type: string
 *               trial_lesson_group_id:
 *                 type: string
 *               lid_status_id:
 *                 type: string
 *               cancel_reason_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Lid updated successfully
 *       '400':
 *         description: Lid not found or validation error
 *       '500':
 *         description: Internal server error
 */
lids.put("/updateLid/:id", validationSchema(updateLidValidation), updateLid);

/**
 * @swagger
 * /lids/getLidById/{id}:
 *   get:
 *     summary: Get lid by ID
 *     tags: [Lids]
 *     description: Retrieve single lead details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid retrieved successfully
 *       '400':
 *         description: Lid not found
 *       '500':
 *         description: Internal server error
 */
lids.get("/getLidById/:id", getLidById);

/**
 * @swagger
 * /lids/deleteLid/{id}:
 *   delete:
 *     summary: Delete lid
 *     tags: [Lids]
 *     description: Remove lead by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lid deleted successfully
 *       '400':
 *         description: Lid not found
 *       '500':
 *         description: Internal server error
 */
lids.delete("/deleteLid/:id", deleteLid);

module.exports = { lids };
