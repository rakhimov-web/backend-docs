const Joi = require("joi");

const postLidValidation = Joi.object({
  first_name: Joi.string().required().trim(),
  last_name: Joi.string().required().trim(),
  phone_number: Joi.string().required().trim(),
  lid_stage_id: Joi.string().hex().length(24).required(),
  test_date: Joi.date().required(),
  trial_lesson_date: Joi.date().required(),
  trial_lesson_time: Joi.string().required().trim(),
  trial_lesson_group_id: Joi.string().hex().length(24).required(),
  lid_status_id: Joi.string().hex().length(24).required(),
  cancel_reason_id: Joi.string().hex().length(24).required(),
});

const updateLidValidation = Joi.object({
  first_name: Joi.string().trim().optional(),
  last_name: Joi.string().trim().optional(),
  phone_number: Joi.string().trim().optional(),
  lid_stage_id: Joi.string().hex().length(24).optional(),
  test_date: Joi.date().optional(),
  trial_lesson_date: Joi.date().optional(),
  trial_lesson_time: Joi.string().trim().optional(),
  trial_lesson_group_id: Joi.string().hex().length(24).optional(),
  lid_status_id: Joi.string().hex().length(24).optional(),
  cancel_reason_id: Joi.string().hex().length(24).optional(),
});

module.exports = { postLidValidation, updateLidValidation };
