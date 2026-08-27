const Joi = require("joi");

const postReasonLidValidation = Joi.object({
  reason_lid: Joi.string().required().trim(),
});

const updateReasonLidValidation = Joi.object({
  reason_lid: Joi.string().trim().optional(),
});

module.exports = { postReasonLidValidation, updateReasonLidValidation };
