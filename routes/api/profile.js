const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// Load USER and POST Model
const User = require('../../models/User');
const Post = require('../../models/Post');

// Password Reset 
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const async = require('async');


// @ROUTE GET http://localhost:4000/api/profile/:id
// @DESC GET POSTS BY USER ID
// @ACCESS PRIVATE
router.get('/:id', (req, res) => {
    Post.find({'user': req.params.id})
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostsfound: 'User has not published any posts yet' }));
})


module.exports = router;