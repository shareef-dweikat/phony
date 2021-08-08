import Validator from "validator";
import isEmpty from "./is_empty";

function validateForgotPasswordInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "User Name field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export default validateForgotPasswordInput;
