const Joi = require('joi');

const productsDTO = Joi.object({
  name: Joi.string().min(5).required(),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least 5 characters long',
});

const validateAddMiddleware = (req, res, next) => {
  const { error } = productsDTO.validate(req.body, { abortEarly: false });
  console.log(error);
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

module.exports = validateAddMiddleware;