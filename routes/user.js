const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const TOKEN_KEY = "thisismytokenkey"

router.get('',(req,res)=> {
    User.find().then((users)=>{
        res.json({
            message: 'Users found',
            users: users
        })
    })
})

//register user
router.post('/register',async (req,res)=>{
      
  try {
    
    const { username, password } = req.body;

    
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("Username is currently in use.");
    }

    
    encryptedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({
      username: username, 
      password: encryptedPassword,
    });

    
    const token = jwt.sign(
      { user_id: user._id, username },
      TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    
    
    res.status(201).json({
        message: 'User created',
        token: token
    })
} catch (err) {
    console.log(err);
  }
})

//login user
router.post('/login',async (req,res)=>{
    try {
        const { username, password } = req.body;
        
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }

        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            
            const token = jwt.sign(
              { user_id: user._id, username },
              TOKEN_KEY,
              {
                expiresIn: "1h",
              }
            );
            res.status(201).json({
                message: 'Successful login',
                token: token
            })
        }
        else{
            res.status(400).send("Login failed, check user details.")
        }
        
    }
    catch(err){
        console.log(err);
    }
})



router.delete('/:id',(req,res)=>{
    User.deleteOne({_id: req.params.id})
    .then((result)=> {
        res.status(200).json({message : "user deleted"})
    });
})

module.exports = router