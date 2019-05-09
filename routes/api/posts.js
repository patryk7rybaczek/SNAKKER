const express = require('express');
const router = express.Router();

const passport = require('passport');
// Post validate
const validatePostInput = require('../../validation/post');

// Post Model 
const Post = require('../../models/Post');

// User Model
const User = require('../../models/User');

// @ROUTE GET http://localhost:4000/api/posts
// @DESC GET ALL POSTS
// @ACCESS PRIVATE

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found'}));
});

// @ROUTE GET api/post/:id
// @DESC GET post by id
// @ACCESS PRIVATE
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err =>
        res.status(404).json({ nopostfound: 'No post found with that id' })
      );
  });

// @ROUTE POST http://localhost:4000/api/posts/add
// @DESC PUBLISH POST
// @ACCESS PRIVATE
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        author: req.body.author,
        user: req.user.id,
    });
    newPost
        .save()
        .then(post => res.json(post))
        .catch(err => console.log(err));
});

// @ROUTE EDIT http://localhost:4000/api/posts/edit/:id
// @DESC EDIT POST
// @ACCESS PRIVATE
router.patch('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.status(400).json({ errors });
    }

    User.findOne({ user: req.user.id }).then(user => {
        Post.findById(req.params.id)
            .then(post => {
                // Check if user is authorized to remove post
                if(post.user.toString() !== req.user.id) {
                    return res.status(401).json({ notauthorized: 'Not Authorized'})
                }

                post.text = req.body.text
                post.save().then(post => res.json({success: true}))
                .catch(err => console.log(err));
            })
            .catch(err => res.status(404).json({ postnotfound: 'Post not found' }))
    }).catch(err => res.status(404).json({ usernotfound: 'User not found' }))
});

// @ROUTE REMOVE http://localhost:4000/api/posts/remove/:id
// @DESC REMOVE POST
// @ACCESS PRIVATE
router.delete('/remove/:id', passport.authenticate('jwt', { session: false }), (req, res) =>  {
    User.findOne({ user: req.user.id }).then(user => {
        Post.findById(req.params.id)
            .then(post => {
                // Check if user is authorized to remove post
                if(post.user.toString() !== req.user.id) {
                    return res.status(401).json({ notauthorized: 'Not Authorized'})
                }

                post.remove().then(() => {
                    res.json({ success: true })    
                })
            })
            .catch(err => res.status(404).json({ postnotfound: 'Post not found' }))
    }).catch(err => res.status(404).json({ usernotfound: 'User not found' }))

});

// @ROUTE POST http://localhost:4000/api/posts/like/:id
// @DESC LIKE POST 
// @ACCESS PRIVATE
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
        Post.findById(req.params.id)
            .then(post => {
                if (
                    post.likes.filter(like => like.user.toString() === req.user.id)
                      .length > 0
                  ) {
                    return res
                      .status(400)
                      .json({ alreadyliked: 'You already liked this post' });
                  }

                // Add user id to likes array
                post.likes.unshift({ user: req.user.id });

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
});

// @ROUTE POST http://localhost:4000/api/posts/unlike/:id
// @DESC UNLIKE POST
// @ACCESS PRIVATE
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
        Post.findById(req.params.id)
            .then(post => {
                if(
                    post.likes.filter(like => like.user.toString() === req.user.id).length === 0
                ) {
                    return res.status(400).json({ notlikedyet: 'You have not liked this post'});
                }

                // Remove Index
                const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);

                // Splice out of array
                post.likes.splice(removeIndex, 1);

                // Save
                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ postnotfound: 'No post found'}));
    });
});

// @ROUTE POST http://localhost:4000/api/posts/comment/:id
// @DESC ADD COMMENT POST
// @ACCESS PRIVATE
router.post('/comment/:id', (req,res) => {

    const { errors, isValid } = validatePostInput(req.body)
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                user: req.body.id,
                text: req.body.text,
                author: req.body.author                
            };

            // Add comment to commmentArray in Posts Model
            post.comments.unshift(newComment);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'Post not found' }));
})

// @ROUTE POST http://localhost:4000/api/posts/comment/:id/:comment_id
// @DESC REMOVE COMMENT POST
// @ACCESS PRIVATE
router.delete('/comment/:id/:comment_id', (req,res) => {
    console.log(req.params)
    Post.findById(req.params.id)
        .then(post =>  {
            // Check if comment exists
            if (
                post.comments.filter(
                    comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
            ) {
                return res
                    .status(404)
                    .json({ nocommentyet: 'You have not created a comment to this post' })
            }

            //
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            // Splice out
            post.comments.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
        })
        .catch( err => res.status( 404 ).json( { postnotfound: 'No post found!' } ) );

})

module.exports = router;