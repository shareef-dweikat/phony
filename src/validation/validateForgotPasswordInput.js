import Validator from "validator";
import isEmpty from "./is_empty";

function validateForgotPasswordInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.last4Digit = !isEmpty(data.last4Digit) ? data.last4Digit : "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "This field is required";
  }

  if (Validator.isEmpty(data.last4Digit)) {
    errors.last4Digit = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export default validateForgotPasswordInput;
