const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateCommentInput(data) {
    let errors = {};
    console.log(data)
    // Converting empty fields to empty string
    // To use validator functions on them
    data.text = !isEmpty(data.text) ? data.text : '';
    data.author = !isEmpty(data.author) ? data.author: '';
    
    // Comment Validation
    if (Validator.isEmpty(data.text)) {
        errors.commentText = 'Comment cant be empty';
        errors.postID = data.postID
    }
    
    if (!Validator.isLength(data.text, { min: 10, max: 2800 })) {
        errors.commentText = 'Comment must be between 10 and 300 characters';
        errors.postID = data.postID
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
