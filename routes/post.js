const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const checkAuth = require('../check-auth.js')


//return all posts for 1 user
router.get('', (req,res)=>{
    Post.find({userId: req.body.userId}).then((posts)=> {
        res.json({
            message: 'Posts found',
            posts: posts
        })
    })
})



//return all posts
router.get('/all',checkAuth, (req,res)=>{
    Post.find().then((posts)=> {
        res.json({
            message: 'Posts found',
            posts: posts
        })
    })
})



//post a post
router.post('',checkAuth, (req,res)=>{
    try{
        const post = Post({
            subject: req.body.subject,
            description: req.body.description,
            userId: req.body.userId

        })
            post.save();
            res.status(201).json({
                message:'Post created',
                post:post
        })
    }
    catch(err){
        console.log(err);
    }
})


//delete a post
router.delete('/:id', checkAuth, async(req,res)=>{
    const postId = req.params.id;
    try{
        const post = await Post.findById(postId);

        await Post.deleteOne({_id:postId})

        res.status(201).json({
            message: 'Post was deleted'
        })
    }
    catch(error){
        return res.status(404).json({
            message: 'Post not found'
        })
    }
   
})
module.exports = router