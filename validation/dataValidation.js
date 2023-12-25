const Joi = require("@hapi/joi");
exports.addData = Joi.object({
  dataType: Joi.string()
    .required()
    .error(new Error("❌ Please enter the data type")),
  value: Joi.number().required().invalid().error(new Error("need number only")),
  location: Joi.string()
    .required()
    .error(new Error("❌ Please enter your location")),
  source: Joi.string()
    .required()
    .error(new Error("❌ Please enter source of data")),
  unit: Joi.string()
    .required()
    .error(new Error("❌ Please enter unit of data")),
});
exports.editData = Joi.object({
  dataType: Joi.string(),
  key: Joi.string(),
  value: Joi.number().invalid().error(new Error("need number only")),
  location: Joi.string(),
  source: Joi.string(),
  unit: Joi.string(),
})
  .min(1)
  .message("Please enter the infromaton you want to edit");
