const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Converting empty fields to empty string
    // To use validator functions on them
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Name Validation
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

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
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = 'Password must be at least 8 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};