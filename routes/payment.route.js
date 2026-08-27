const { Router } = require("express");
const payments = Router();

const {
  postPayment,
  getPaymentById,
  getPayments,
  updatePayment,
  deletePayment,
  searchPayments,
} = require("../controllers/payment.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }
  next();
};

const {
  postPaymentValidation,
  updatePaymentValidation,
} = require("../validation/payment.validation");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management endpoints
 */

/**
 * @swagger
 * /payments/create:
 *   post:
 *     summary: Create payment
 *     tags: [Payments]
 *     description: Create a new payment entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *               payment_date:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *               is_paid:
 *                 type: boolean
 *               total_attent:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Payment created successfully
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Internal server error
 */
payments.post("/create", validationSchema(postPaymentValidation), postPayment);

/**
 * @swagger
 * /payments/getPayments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     description: Retrieve list of payments
 *     responses:
 *       '200':
 *         description: Payments retrieved successfully
 *       '500':
 *         description: Internal server error
 */
payments.get("/getPayments", getPayments);

/**
 * @swagger
 * /payments/search:
 *   get:
 *     summary: Search payments
 *     tags: [Payments]
 *     description: Search payments by query string
 *     parameters:
 *       - in: query
 *         name: student_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: is_paid
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: Payments found
 *       '400':
 *         description: Invalid query parameter
 *       '500':
 *         description: Internal server error
 */
payments.get("/search", searchPayments);

/**
 * @swagger
 * /payments/updatePayment/{id}:
 *   put:
 *     summary: Update payment
 *     tags: [Payments]
 *     description: Update payment data by ID
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
 *               student_id:
 *                 type: string
 *               payment_last_date:
 *                 type: string
 *                 format: date
 *               payment_date:
 *                 type: string
 *                 format: date
 *               price:
 *                 type: number
 *               is_paid:
 *                 type: boolean
 *               total_attent:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Payment updated successfully
 *       '400':
 *         description: Payment not found or validation error
 *       '500':
 *         description: Internal server error
 */
payments.put(
  "/updatePayment/:id",
  validationSchema(updatePaymentValidation),
  updatePayment,
);

/**
 * @swagger
 * /payments/getPaymentById/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags: [Payments]
 *     description: Retrieve single payment details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment retrieved successfully
 *       '400':
 *         description: Payment not found
 *       '500':
 *         description: Internal server error
 */
payments.get("/getPaymentById/:id", getPaymentById);

/**
 * @swagger
 * /payments/deletePayment/{id}:
 *   delete:
 *     summary: Delete payment
 *     tags: [Payments]
 *     description: Remove payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Payment deleted successfully
 *       '400':
 *         description: Payment not found
 *       '500':
 *         description: Internal server error
 */
payments.delete("/deletePayment/:id", deletePayment);

module.exports = { payments };
