const Joi = require("joi");

const postStageValidation = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
});

const updateStageValidation = Joi.object({
  name: Joi.string().trim().min(2).max(50),
});

module.exports = {
  postStageValidation,
  updateStageValidation,
};
