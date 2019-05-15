const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load input validation
const validateLoginInput = require('../../validation/login');
const validateRetrieve = require('../../validation/retrieve');
const validateRegisterInput = require('../../validation/register');
const ValidateNewPass = require('../../validation/newPass');
// Load User Model
const User = require('../../models/User');

// Password Reset 
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const async = require('async');


// @ROUTE POST http://localhost:4000/api/users/register
// @DESC REGISTER USER ROUTE
// @ACCESS PUBLIC
router.post('/register', (req, res) => {
    // Validate body from request 
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email is in use'})
        } else {
            // Create new User 
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before storing in DB
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @ROUTE POST http://localhost:4000/api/users/login
// @DESC LOGIN USER ROUTE & RETURN JWT TOKEN
// @ACCESS PUBLIC
router.post('/login', (req,res) => {
    // Validate body from request
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(409).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user in DB by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: 'Email not found'});
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Found
                // Create JWT Token
                const payload = {
                    id: user.id,
                    name: user.name
                }

                // Sign JWT Toke
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 900 // 15Min in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res 
                    .status(409)
                    .json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
});

// @ROUTE POST http://localhost:4000/api/users/retrieve
// @DESC RESET PASSWORD AND SEND LINK TO USERS EMAIL
// @ACCESS PUBLIC
router.post('/retrieve', (req, res, next) => {
    // Validate body from request
    const { errors, isValid } = validateRetrieve(req.body);

    // Check validation
    if (!isValid) {
        return res.status(409).json(errors);
    }

    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                let token = buf.toString('hex');
                done(err,token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({ emailnotfound: 'Email not found'});
                }
                
                user.resetPasswordToken = token,
                user.resetPasswordExpires = Date.now() + 3600000 // 1 hour valid
                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var stmpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'noreply.snakker@gmail.com',
                    pass: process.env.GMAIL_PASS
                }
            });

            var mailOptions = {
                to: user.email,
                from: 'noreply.snakker@gmail.com',
                subject: 'Snakker password reset',
                text: 'You are receiving this because you (or someone else) have required a password reset'+ '\n\n' +
                    'Please click on the following link to complete the process ' + '\n\n' +
                    'http://localhost:3000/verify/' + token + '\n\n' + 
                    'If you did not request a password reset please ignore this mail.'
            };

            stmpTransport.sendMail(mailOptions, function(err) {
                done(err, 'done');
                return res.json({success: true, message: 'Email has been sent'})
            });
        }
    ], function(err) {
        if(err) return res.status(409).json(err);

    });
});

// @ROUTE POST http://localhost:4000/api/users/retrieve/:token
// @DESC RESET PASSWORD AND SEND LINK TO USERS EMAIL
// @ACCESS PUBLIC
router.post('/retrieve/:token' , function(req,res) {
    // Validate body from request
    const { errors, isValid } = ValidateNewPass(req.body.userData);
    // Check validation
    if (!isValid) {
        return res.status(409).json(errors);
    }
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}).then(user => {
                // Check if user exists
                if(!user) {
                    return res.status(404).json({password: 'Password reset token is invalid or has expired!'});
                }
                const password = req.body.userData.password;
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if(err) throw err;

                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
                        user.password = hash;
                        user.save(function(err) {
                            done(err, user);
                        });
                    });
                });
            });
        }, 
        function(user, done) {
            var stmpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'noreply.snakker@gmail.com',
                    pass: 'powerking!'
                }
            });

            var mailOptions = {
                to: user.email,
                from: 'noreply.snakker@gmail.com',
                subject: 'Password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            stmpTransport.sendMail(mailOptions, function(err) {
                done(err);
                return res.json({success: true, message: 'Password has been changed'})
            });
        }
    ], function(err) {
        if(err) return res.status(409).json(err);
    });
});

// @ROUTE GET http://localhost:4000/api/users
// @DESC GET ALL USERS 
// @ACCESS PRIVATE
router.get('/', (req, res) => {
    User.find().then(user => {
        // Really we are getting only the names, i dont see any point in sending whole user object
        // Also could be security risk?
        let users = user.map(function(obj){
            return {"name":obj["name"], "id":obj["_id"]};
        });
        res.json(users)
    }).catch(err => res.status(404).json({ nousersfound: 'No users found' }));
});


module.exports = router;