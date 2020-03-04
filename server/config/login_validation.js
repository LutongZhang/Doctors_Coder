const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data){
    let errors = {};

    //Convert any empty fields to a string
    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Check email
    if (Validator.isEmpty(data.userName)) {
        errors.userName = "Username field is required";
    }

    //Check password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};