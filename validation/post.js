const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};
    
    // Converting empty fields to empty string
    // To use validator functions on them
    data.text = !isEmpty(data.text) ? data.text : '';

    // Post Validation
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Post cant be empty';
    }
    
    if (!Validator.isLength(data.text, { min: 10, max: 2800 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};