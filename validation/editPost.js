const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateEditPostInput(data) {
    let errors = {};
    
    // Converting empty fields to empty string
    // To use validator functions on them
    data.text = !isEmpty(data.text) ? data.text : '';

    // Post Validation
    if (Validator.isEmpty(data.text)) {
        errors.editText = 'Post cant be empty';
        errors.editTextID = data.id
    }
    
    if (!Validator.isLength(data.text, { min: 10, max: 2800 })) {
        errors.editText = 'Post must be between 10 and 300 characters';
        errors.editTextID = data.id
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};