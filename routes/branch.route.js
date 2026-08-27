const { Router } = require("express");
const branches = Router();

const {
  postBranch,
  getBranchById,
  getBranches,
  updateBranch,
  deleteBranch,
} = require("../controllers/branch.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postBranchValidation,
  updateBranchValidation,
} = require("../validation/branch.validation");

/**
 * @swagger
 * tags:
 *   name: Branches
 *   description: Branch management endpoints
 */

/**
 * @swagger
 * /branches/create:
 *   post:
 *     summary: Create branch
 *     tags: [Branches]
 *     description: Create a new branch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               call_number:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Branch created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
branches.post("/create", validationSchema(postBranchValidation), postBranch);

/**
 * @swagger
 * /branches/getBranches:
 *   get:
 *     summary: Get all branches
 *     tags: [Branches]
 *     description: Retrieve list of branches
 *     responses:
 *       '200':
 *         description: Branches retrieved successfully
 *       '500':
 *         description: Internal server error
 */
branches.get("/getBranches", getBranches);

/**
 * @swagger
 * /branches/updateBranch/{id}:
 *   put:
 *     summary: Update branch
 *     tags: [Branches]
 *     description: Update branch data by ID
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
 *               address:
 *                 type: string
 *               call_number:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 *       '400':
 *         description: Branch not found or validation error
 *       '500':
 *         description: Internal server error
 */
branches.put(
  "/updateBranch/:id",
  validationSchema(updateBranchValidation),
  updateBranch,
);

/**
 * @swagger
 * /branches/getBranchById/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branches]
 *     description: Retrieve single branch details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch retrieved successfully
 *       '400':
 *         description: Branch not found
 *       '500':
 *         description: Internal server error
 */
branches.get("/getBranchById/:id", getBranchById);

/**
 * @swagger
 * /branches/deleteBranch/{id}:
 *   delete:
 *     summary: Delete branch
 *     tags: [Branches]
 *     description: Remove branch by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch deleted successfully
 *       '400':
 *         description: Branch not found
 *       '500':
 *         description: Internal server error
 */
branches.delete("/deleteBranch/:id", deleteBranch);

module.exports = { branches };
