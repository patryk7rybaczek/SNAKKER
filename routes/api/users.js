const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load input validation
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

// Load User Model
const User = require('../../models/User');

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

module.exports = router;