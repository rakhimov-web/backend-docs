const Joi = require("joi");

const postGroupValidation = Joi.object({
  group_name: Joi.string().required().trim(),
  lesson_start_time: Joi.string().required().trim(),
  lesson_continuous: Joi.string().required().trim(),
  lesson_week_day: Joi.string().required().trim(),
  group_stage_id: Joi.string().hex().length(24).required(),
  room_number: Joi.string().required().trim(),
  room_floor: Joi.number().required(),
  branch_id: Joi.string().hex().length(24).required(),
  lessons_quant: Joi.number().required(),
  is_active: Joi.boolean().optional(),
});

const updateGroupValidation = Joi.object({
  group_name: Joi.string().trim().optional(),
  lesson_start_time: Joi.string().trim().optional(),
  lesson_continuous: Joi.string().trim().optional(),
  lesson_week_day: Joi.string().trim().optional(),
  group_stage_id: Joi.string().hex().length(24).optional(),
  room_number: Joi.string().trim().optional(),
  room_floor: Joi.number().optional(),
  branch_id: Joi.string().hex().length(24).optional(),
  lessons_quant: Joi.number().optional(),
  is_active: Joi.boolean().optional(),
});

module.exports = { postGroupValidation, updateGroupValidation };
