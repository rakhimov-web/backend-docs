const Joi = require("joi");

const postStudentLessonValidation = Joi.object({
  student_id: Joi.string().hex().length(24).required(),
  lesson_id: Joi.string().hex().length(24).required(),
  is_there: Joi.boolean().required(),
  reason: Joi.string().required().trim(),
  be_paid: Joi.boolean().required(),
});

const updateStudentLessonValidation = Joi.object({
  student_id: Joi.string().hex().length(24).optional(),
  lesson_id: Joi.string().hex().length(24).optional(),
  is_there: Joi.boolean().optional(),
  reason: Joi.string().trim().optional(),
  be_paid: Joi.boolean().optional(),
});

module.exports = { postStudentLessonValidation, updateStudentLessonValidation };
