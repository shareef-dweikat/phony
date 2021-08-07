import Validator from "validator";
import translate from "../i18n/translate";
import isEmpty from "./is_empty";

function validateSignUpInput(data) {
  let errors = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  //fullName
  if (!Validator.isLength(data.fullName, { min: 2, max: 30 })) {
    errors.fullName = translate("Full Name must be between 2 and 30 characters");
  }
  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = translate("Name field is required");
  }
  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = translate("Mobile Number is required");
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = translate("City is required");
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = translate("Country is required");
  }
  //*********** */


  if (Validator.isEmpty(data.password)) {
    errors.password = translate("Password field is required");
  }
  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = translate("password must be at least 8 characters");
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = translate("confirm Password field is required");
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = translate("Passwords must match");
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export default validateSignUpInput;
