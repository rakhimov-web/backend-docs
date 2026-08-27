const Joi = require("joi");

const postLessonValidation = Joi.object({
  lesson_theme: Joi.string().required().trim(),
  lesson_number: Joi.number().required(),
  group_id: Joi.string().hex().length(24).required(),
  lesson_date: Joi.date().required(),
});

const updateLessonValidation = Joi.object({
  lesson_theme: Joi.string().trim().optional(),
  lesson_number: Joi.number().optional(),
  group_id: Joi.string().hex().length(24).optional(),
  lesson_date: Joi.date().optional(),
});

module.exports = { postLessonValidation, updateLessonValidation };
