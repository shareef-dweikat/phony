import Validator from "validator";
import isEmpty from "./is_empty";

function validateSignUpVerificationInput(data) {
  let errors = {};

  data.verificationCode = !isEmpty(data.verificationCode) ? data.verificationCode : "";
  data.sellerId = !isEmpty(data.sellerId) ? `${data.sellerId}` : "";
  data.mobile = !isEmpty(data.mobile) ? `${data.mobile}` : "";

  if (Validator.isEmpty(data.verificationCode)) {
    errors.verificationCode = "Verification Code field is required";
  }

  if (Validator.isEmpty(data.sellerId) || Validator.isEmpty(data.mobile)) {
    errors.general = "You need to sign up again.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export default validateSignUpVerificationInput;
