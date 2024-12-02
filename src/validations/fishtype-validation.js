import Joi from "joi";

const registerFishTypeValidation = Joi.object({
  name: Joi.string().max(50).required(),
  cleaning_speed: Joi.number().required(),
  cleaning_duration: Joi.number().required(),
});

const updateFishTypeValidation = Joi.object({
  name: Joi.string().max(50).optional(),
  cleaning_speed: Joi.number().optional(),
  cleaning_duration: Joi.number().optional(),
});

export { registerFishTypeValidation, updateFishTypeValidation };
