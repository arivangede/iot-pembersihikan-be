import Joi from "joi";

const registerDeviceValidation = Joi.object({
  brand: Joi.string().max(20).required(),
  model: Joi.string().max(50).required(),
  os: Joi.string().max(20).required(),
  os_version: Joi.string().max(50).required(),
  processor: Joi.string().max(100).required(),
  ram: Joi.number().required(),
});

const updateDeviceValidation = Joi.object({
  brand: Joi.string().max(20).optional(),
  model: Joi.string().max(50).optional(),
  os: Joi.string().max(20).optional(),
  os_version: Joi.string().max(50).optional(),
  processor: Joi.string().max(100).optional(),
  ram: Joi.number().optional(),
});

export { registerDeviceValidation, updateDeviceValidation };
