const Joi = require('joi');

const studentSchema = Joi.object({
  student_name: Joi.string().min(3).max(100).required(),
  national_id: Joi.string().min(5).max(50).required(),
  phone: Joi.string().pattern(/^[0-9]{8,15}$/).required(),
  whatsapp: Joi.string().pattern(/^[0-9]{8,15}$/).optional(),
  gender: Joi.string().valid("male", "female").required(),
  grade: Joi.string().max(50).required(),
  date_of_entry: Joi.date().required(),
  family_members: Joi.number().integer().min(1).required(),
  residence_location: Joi.string().max(255).required(),
  map_link: Joi.string().uri().optional().allow(""),
  special_needs: Joi.boolean().required(),
  martyr: Joi.boolean().required(),
  provider: Joi.string().max(100).optional().allow(""),
  relationship: Joi.string().max(100).optional().allow(""),
  war_injury: Joi.boolean().required(),
  injury_details: Joi.string().max(255).optional().allow(""),
  description: Joi.string().max(500).optional().allow(""),
  registration_date: Joi.date().required()
});

module.exports = { studentSchema };
