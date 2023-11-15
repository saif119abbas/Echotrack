const Joi = require("@hapi/joi");
exports.createAlertValidation = Joi.object({
  alertType: Joi.string()
    .required()
    .min(3)
    .message("❌ Too Short!")
    .max(25)
    .message("❌ Too Long!"),
  threshold: Joi.number()
    .required()
    .error(new Error("❌ Please enter your threshold value")),
});
exports.editAlertValidation = Joi.object({
  alertType: Joi.string()
    .min(3)
    .message("❌ Too Short!")
    .max(25)
    .message("❌ Too Long!"),
  threshold: Joi.number(),
})
  .min(1)
  .message("Please enter the information you want to edit");
