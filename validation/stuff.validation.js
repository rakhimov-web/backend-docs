const Joi = require("joi");

const postStuffValidation = Joi.object({
  first_name: Joi.string().required().trim(),
  last_name: Joi.string().required().trim(),
  phone_number: Joi.string().required().trim(),
  login: Joi.string().required().trim(),
  parol: Joi.string().min(6).required(),
  is_active: Joi.boolean().optional(),
});

const updateStuffValidation = Joi.object({
  first_name: Joi.string().trim().optional(),
  last_name: Joi.string().trim().optional(),
  phone_number: Joi.string().trim().optional(),
  login: Joi.string().trim().optional(),
  parol: Joi.string().min(6).optional(),
  is_active: Joi.boolean().optional(),
});

const loginStuffValidation = Joi.object({
  login: Joi.string().required().trim(),
  parol: Joi.string().required(),
});

module.exports = {
  postStuffValidation,
  updateStuffValidation,
  loginStuffValidation,
};
