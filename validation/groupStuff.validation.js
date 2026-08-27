const Joi = require("joi");

const postGroupStuffValidation = Joi.object({
  group_id: Joi.string().hex().length(24).required(),
  stuff_id: Joi.string().hex().length(24).required(),
});

module.exports = { postGroupStuffValidation };
