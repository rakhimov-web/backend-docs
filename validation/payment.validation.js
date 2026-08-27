const Joi = require("joi");

const postPaymentValidation = Joi.object({
  student_id: Joi.string().hex().length(24).required(),
  payment_last_date: Joi.date().required(),
  payment_date: Joi.date().required(),
  price: Joi.number().required(),
  is_paid: Joi.boolean().optional(),
  total_attent: Joi.number().optional(),
});

const updatePaymentValidation = Joi.object({
  student_id: Joi.string().hex().length(24).optional(),
  payment_last_date: Joi.date().optional(),
  payment_date: Joi.date().optional(),
  price: Joi.number().optional(),
  is_paid: Joi.boolean().optional(),
  total_attent: Joi.number().optional(),
});

module.exports = { postPaymentValidation, updatePaymentValidation };
