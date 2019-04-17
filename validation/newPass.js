const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function ValidateNewPass(data) {
    let errors = {}

    // Converting empty field to empty string
    // To use validator functions on them
    data.password = !isEmpty(data.password) ? data.password : '';

    // Password Validation
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    } else if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = 'Password must be at least 8 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};