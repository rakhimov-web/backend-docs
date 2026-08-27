const Joi = require("joi");

const postLidStatusValidation = Joi.object({
  status: Joi.string().required().trim(),
});

const updateLidStatusValidation = Joi.object({
  status: Joi.string().trim().optional(),
});

module.exports = { postLidStatusValidation, updateLidStatusValidation };
