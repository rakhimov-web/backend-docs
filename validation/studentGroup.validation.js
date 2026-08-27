const Joi = require("joi");

const postStudentGroupValidation = Joi.object({
  student_id: Joi.string().hex().length(24).required(),
  group_id: Joi.string().hex().length(24).required(),
});

module.exports = { postStudentGroupValidation };
