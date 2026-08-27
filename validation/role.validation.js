const Joi = require("joi");

const postRoleValidation = Joi.object({
  name: Joi.string().required().trim(),
});

const updateRoleValidation = Joi.object({
  name: Joi.string().trim().optional(),
});

module.exports = { postRoleValidation, updateRoleValidation };
