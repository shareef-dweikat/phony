import Validator from "validator";
import isEmpty from "./is_empty";

function validateJawwalInput(data) {
  let errors = {};

  data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : "";

  //fullName

  //*********** */

  if (Validator.isEmpty(data.mobileNo)) {
    errors.mobileNo = "mobile Number is required";
  }
//   if (!Validator.isMobilePhone(data.isNumber)) {
//     errors.mobileNo = "Phone is invalid";
//   }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export default validateJawwalInput;
