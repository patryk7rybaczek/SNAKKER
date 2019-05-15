const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load USER and POST Model
const Post = require('../../models/Post');



// @ROUTE GET http://localhost:4000/api/profile/:id
// @DESC GET POSTS BY USER ID
// @ACCESS PRIVATE
router.get('/:id', (req, res) => {
    Post.find({'user': req.params.id})
        .sort({ Date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'User has not published any posts yet' }));
})


module.exports = router;