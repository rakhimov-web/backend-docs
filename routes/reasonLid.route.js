const { Router } = require("express");
const reasonLids = Router();

const {
  postReasonLid,
  getReasonLidById,
  getReasonLids,
  updateReasonLid,
  deleteReasonLid,
} = require("../controllers/reasonLid.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postReasonLidValidation,
  updateReasonLidValidation,
} = require("../validation/reasonLid.validation");

/**
 * @swagger
 * tags:
 *   name: ReasonLids
 *   description: Reason lid management endpoints
 */

/**
 * @swagger
 * /reason-lids/create:
 *   post:
 *     summary: Create reason lid
 *     tags: [ReasonLids]
 *     description: Create a new lid cancellation reason
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason_lid:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Reason lid created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
reasonLids.post(
  "/create",
  validationSchema(postReasonLidValidation),
  postReasonLid,
);

/**
 * @swagger
 * /reason-lids/getReasonLids:
 *   get:
 *     summary: Get all reason lids
 *     tags: [ReasonLids]
 *     description: Retrieve list of reason lids
 *     responses:
 *       '200':
 *         description: Reason lids retrieved successfully
 *       '500':
 *         description: Internal server error
 */
reasonLids.get("/getReasonLids", getReasonLids);

/**
 * @swagger
 * /reason-lids/updateReasonLid/{id}:
 *   put:
 *     summary: Update reason lid
 *     tags: [ReasonLids]
 *     description: Update reason lid data by ID
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
 *               reason_lid:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reason lid updated successfully
 *       '400':
 *         description: Reason lid not found or validation error
 *       '500':
 *         description: Internal server error
 */
reasonLids.put(
  "/updateReasonLid/:id",
  validationSchema(updateReasonLidValidation),
  updateReasonLid,
);

/**
 * @swagger
 * /reason-lids/getReasonLidById/{id}:
 *   get:
 *     summary: Get reason lid by ID
 *     tags: [ReasonLids]
 *     description: Retrieve single reason lid details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reason lid retrieved successfully
 *       '400':
 *         description: Reason lid not found
 *       '500':
 *         description: Internal server error
 */
reasonLids.get("/getReasonLidById/:id", getReasonLidById);

/**
 * @swagger
 * /reason-lids/deleteReasonLid/{id}:
 *   delete:
 *     summary: Delete reason lid
 *     tags: [ReasonLids]
 *     description: Remove reason lid by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reason lid deleted successfully
 *       '400':
 *         description: Reason lid not found
 *       '500':
 *         description: Internal server error
 */
reasonLids.delete("/deleteReasonLid/:id", deleteReasonLid);

module.exports = { reasonLids };
