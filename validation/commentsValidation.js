const Joi = require("@hapi/joi");
exports.commentValidation = Joi.object({
  description: Joi.string()
    .required()
    .error(new Error("❌ Please the discription")),
});
