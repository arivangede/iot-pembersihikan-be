import Joi from "joi";

export const createOperationValidation = Joi.object({
  start_time: Joi.date().iso().required(),
  framework: Joi.string().max(20).required(),
  connection_type: Joi.string().max(20).required(),
  cellular_generation: Joi.string().max(10).optional(),
});
