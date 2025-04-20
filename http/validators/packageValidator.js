const Joi = require("joi");

exports.createPackageSchema = Joi.object({
  destination: Joi.string().min(3).required(),
  weight: Joi.number().positive().required(),
});

exports.updatePackageSchema = Joi.object({
  destination: Joi.string().min(3).optional(),
  weight: Joi.number().positive().optional(),
  status: Joi.string().valid("pending", "shipped", "delivered").optional(),
  driverId: Joi.string().hex().length(24).optional(),
});

exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
