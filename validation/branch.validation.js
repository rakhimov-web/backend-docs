const Joi = require("joi");

const postBranchValidation = Joi.object({
  name: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
  call_number: Joi.string().required().trim(),
});

const updateBranchValidation = Joi.object({
  name: Joi.string().trim().optional(),
  address: Joi.string().trim().optional(),
  call_number: Joi.string().trim().optional(),
});

module.exports = { postBranchValidation, updateBranchValidation };
