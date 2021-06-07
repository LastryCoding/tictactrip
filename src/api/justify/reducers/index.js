//Validator
const isEmpty = (string) => {
  return string.trim() === "";
};

exports.validateData = (data) => {
  let errors = {};
  if (isEmpty(data.text)) errors.text = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
