const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //Convert any empty fields to empty strings

  //Name checks
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name field is required";
  }

  //Username checks
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Username field is required";
  }

  //Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 16 })) {
    errors.password = "Password must be between 6 and 16 characters";
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
