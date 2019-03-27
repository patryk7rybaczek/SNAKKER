const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Converting empty fields to empty string
    // To use validator functions on them
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Email Validation
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid Email';
    }

    // Password Validation
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};