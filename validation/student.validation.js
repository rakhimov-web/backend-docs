const Joi = require("joi");

const postStudentValidation = Joi.object({
  first_name: Joi.string().required().trim(),
  last_name: Joi.string().required().trim(),
  phone_number: Joi.string().required().trim(),
  lid_id: Joi.string().hex().length(24).required(),
  birthday: Joi.date().required(),
  gender: Joi.string().valid("male", "female").required(),
});

const updateStudentValidation = Joi.object({
  first_name: Joi.string().trim().optional(),
  last_name: Joi.string().trim().optional(),
  phone_number: Joi.string().trim().optional(),
  lid_id: Joi.string().hex().length(24).optional(),
  birthday: Joi.date().optional(),
  gender: Joi.string().valid("male", "female").optional(),
});

module.exports = { postStudentValidation, updateStudentValidation };
