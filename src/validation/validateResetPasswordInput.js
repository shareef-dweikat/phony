import Validator from "validator";
import isEmpty from "./is_empty";

function validateResetPasswordInput(data) {
  let errors = {};

  data.random_number = !isEmpty(data.random_number) ? data.random_number : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.random_number)) {
    errors.random_number = "Confirmation code field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "password must be at least 8 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "confirm Password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export default validateResetPasswordInput;
