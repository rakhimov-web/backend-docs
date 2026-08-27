const Joi = require("joi");

const postStuffRoleValidation = Joi.object({
  stuff_id: Joi.string().hex().length(24).required(),
  role_id: Joi.string().hex().length(24).required(),
});

module.exports = { postStuffRoleValidation };
