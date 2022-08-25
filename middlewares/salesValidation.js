const Joi = require('joi');

const salesDTO = Joi.object({
  productId: Joi.number().required().messages({
    'any.required': '{{#label}} is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '{{#label}} is required',
    'number.min': '{{#label}} must be greater than or equal to 1',
  }),
});

const validateSaleMiddleware = (req, res, next) => {
  const [data] = req.body;
  const { error } = salesDTO.validate(data, { abortEarly: false });
  if (error) {
    const [messages] = error.details.map((err) => {
      if (err.type === 'any.required') {
        return res.status(400).json({ message: err.message });
      }
      return res.status(422).json({ message: err.message });
    });
    return messages;
  }
  next();
};

module.exports = validateSaleMiddleware;