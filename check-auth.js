const jwt = require('jsonwebtoken');
const TOKEN_KEY = "thisismytokenkey";

module.exports=(req,res,next)=>
{
    try
    {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,TOKEN_KEY)
        next()
    }   
    catch(error)
    {
        res.status(401).json({
            message : "Invalid token"
        });
    }
};