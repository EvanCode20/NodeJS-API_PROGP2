const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const checkAuth = require('../check-auth.js')

//return all posts
router.get('', (req,res)=>{
    Post.find({userId: req.body.userId}).then((posts)=> {
        res.json({
            message: 'Posts found',
            posts: posts
        })
    })
})

router.get('/all', (req,res)=>{
    Post.find().then((posts)=> {
        res.json({
            message: 'Posts found',
            posts: posts
        })
    })
})

//post a post
router.post('', checkAuth, (req,res)=>{
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

router.delete('', checkAuth, (req,res)=>{
    Post.deleteOne({subject: req.params.subject})
    .then(()=> {
        res.status(200).json({message : "post deleted"})
    });
})
module.exports = router