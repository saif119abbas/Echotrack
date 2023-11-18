const Joi = require("@hapi/joi");
exports.createEducationalValidation = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .message("❌ Too Short!")
    .max(25)
    .message("❌ Too Long!"),
  description: Joi.string()
    .required()
    .error(new Error("❌ Please the discription")),
  url: Joi.number()
    .required()
    .pattern(/^((https)|(http)):\/\/\w+$/)
    .message("❌ You must use a Najah student email"),
  category: Joi.string()
    .required()
    .error(new Error("❌ Please enter the category")),
});
exports.editEducationalValidation = Joi.object({
  title: Joi.string()
    .min(3)
    .message("❌ Too Short!")
    .max(25)
    .message("❌ Too Long!"),
  description: Joi.string(),
  url: Joi.number()
    .pattern(/^((https)|(http)):\/\/\w+$/)
    .message("❌ You must use a Najah student email"),
  category: Joi.string(),
})
  .min(1)
  .message("Please enter the information you want to edit");
