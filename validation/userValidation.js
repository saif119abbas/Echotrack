const Joi = require("@hapi/joi");
exports.addUserValdition = Joi.object({
  name: Joi.string().required().error(new Error("❌ Please enter your name")),
  email: Joi.string()
    .required()
    .pattern(/\w+@gmail.com/)
    .message("❌ valid email"),
  password: Joi.string().required().min(8).message("❌ Too Short!"),
  confirmPassword: Joi.string().required(),
  location: Joi.string()
    .required()
    .error(new Error("❌ Please enter your location")),
  role: Joi.string().required().error(new Error("❌ Please enter your role")),
  interests: Joi.string()
    .required()
    .error(new Error("❌ Please enter your interests")),
});
exports.editUserValdition = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .pattern(/\w+@gmail.com/)
    .message("❌ valid email"),
  password: Joi.string().min(8).message("❌ Too Short!"),
  confirmPassword: Joi.string().when("password", {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
  location: Joi.string(),
  role: Joi.string(),
  interests: Joi.string(),
})
  .min(1)
  .message("Please enter the infromaton you want to edit");
exports.loginValidation = Joi.object({
  email: Joi.string()
    .required()
    .pattern(/\w+@gmail.com/)
    .message("❌ valid email"),
  password: Joi.string().required().min(8).message("❌ Too Short!"),
});
