const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining user Schema
const UserSchema = new Schema ({
    name: {
        type: String,
        require: true    
    },
    email: {
        type: String,
        require: true,
        uniqure: true,    
    },
    password: {
        type: String,  
        require: true  
    },
    date: {
        type: Date,
        default: Date.now        
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
});

module.exports = User = mongoose.model("users", UserSchema)