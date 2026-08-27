const { Router } = require("express");
const stuffs = Router();

const {
  postStuff,
  getStuffById,
  getStuffs,
  updateStuff,
  deleteStuff,
  searchStuffs,
  loginStuff,
} = require("../controllers/stuff.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postStuffValidation,
  updateStuffValidation,
  loginStuffValidation,
} = require("../validation/stuff.validation");

/**
 * @swagger
 * tags:
 *   name: Stuffs
 *   description: Stuff management endpoints
 */

/**
 * @swagger
 * /stuffs/create:
 *   post:
 *     summary: Create stuff
 *     tags: [Stuffs]
 *     description: Create a new staff member
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
 *               login:
 *                 type: string
 *               parol:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Stuff created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
stuffs.post("/create", validationSchema(postStuffValidation), postStuff);

/**
 * @swagger
 * /stuffs/getStuffs:
 *   get:
 *     summary: Get all stuffs
 *     tags: [Stuffs]
 *     description: Retrieve list of staff members
 *     responses:
 *       '200':
 *         description: Stuffs retrieved successfully
 *       '500':
 *         description: Internal server error
 */
stuffs.get("/getStuffs", getStuffs);

/**
 * @swagger
 * /stuffs/search:
 *   get:
 *     summary: Search stuffs
 *     tags: [Stuffs]
 *     description: Search staff members by query string
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuffs found
 *       '400':
 *         description: Invalid query parameter
 *       '500':
 *         description: Internal server error
 */
stuffs.get("/search", searchStuffs);

/**
 * @swagger
 * /stuffs/login:
 *   post:
 *     summary: Login stuff
 *     tags: [Stuffs]
 *     description: Authenticate staff member by login and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               parol:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid credentials
 *       '403':
 *         description: Account inactive
 *       '500':
 *         description: Internal server error
 */
stuffs.post("/login", validationSchema(loginStuffValidation), loginStuff);

/**
 * @swagger
 * /stuffs/updateStuff/{id}:
 *   put:
 *     summary: Update stuff
 *     tags: [Stuffs]
 *     description: Update staff data by ID
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
 *               login:
 *                 type: string
 *               parol:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Stuff updated successfully
 *       '400':
 *         description: Stuff not found or validation error
 *       '500':
 *         description: Internal server error
 */
stuffs.put(
  "/updateStuff/:id",
  validationSchema(updateStuffValidation),
  updateStuff,
);

/**
 * @swagger
 * /stuffs/getStuffById/{id}:
 *   get:
 *     summary: Get stuff by ID
 *     tags: [Stuffs]
 *     description: Retrieve single staff details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff retrieved successfully
 *       '400':
 *         description: Stuff not found
 *       '500':
 *         description: Internal server error
 */
stuffs.get("/getStuffById/:id", getStuffById);

/**
 * @swagger
 * /stuffs/deleteStuff/{id}:
 *   delete:
 *     summary: Delete stuff
 *     tags: [Stuffs]
 *     description: Remove staff by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Stuff deleted successfully
 *       '400':
 *         description: Stuff not found
 *       '500':
 *         description: Internal server error
 */
stuffs.delete("/deleteStuff/:id", deleteStuff);

module.exports = { stuffs };
