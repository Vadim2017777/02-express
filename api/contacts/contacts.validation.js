const Joi = require("joi");

exports.contactsValadation = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),

  phone: Joi.string().required(),
});
