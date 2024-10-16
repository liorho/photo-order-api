import Joi from 'joi';

export const photosQuerySchema = Joi.object({
  count: Joi.number().integer().min(1).required(),
});

export const orderSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().min(1).required(),
  address: Joi.string().min(1).required(),
  imageUrls: Joi.array().items(Joi.string().uri()).required(),
  frameColor: Joi.string().required(),
  user: Joi.string().required(),
});

export const userIdParamSchema = Joi.object({
  userId: Joi.string().required(),
});