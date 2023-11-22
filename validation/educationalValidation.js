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
  url: Joi.string()
    .required()
    .pattern(
      /^(https?|ftp):\/\/(?:(?:\S+):(?:\S+)@)?((?:www\.)?[a-zA-Z0-9.-]+)(?::(\d+))?((?:\/[^\/?#]*)*)(?:\?([^#]*))?(?:#(\S+))?/
    )
    .message("❌ this is not url"),
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
  url: Joi.string()
    .pattern(
      /^(https?|ftp):\/\/(?:(?:\S+):(?:\S+)@)?((?:www\.)?[a-zA-Z0-9.-]+)(?::(\d+))?((?:\/[^\/?#]*)*)(?:\?([^#]*))?(?:#(\S+))?/
    )
    .message("❌ this is not url"),
  category: Joi.string(),
})
  .min(1)
  .message("Please enter the information you want to edit");
