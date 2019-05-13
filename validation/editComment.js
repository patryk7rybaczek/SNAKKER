const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateEditCommentInput(data) {
    let errors = {};
    
    // Converting empty fields to empty string
    // To use validator functions on them
    data.text = !isEmpty(data.text) ? data.text : '';

    // Post Validation
    if (Validator.isEmpty(data.text)) {
        errors.editCommentText = 'Comment cant be empty';
        errors.editCommentTextID = data.id
    }
    
    if (!Validator.isLength(data.text, { min: 10, max: 2800 })) {
        errors.editCommentText = 'Comment must be between 10 and 300 characters';
        errors.editCommentTextID = data.id
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};