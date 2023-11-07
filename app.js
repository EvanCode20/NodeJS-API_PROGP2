const express = require('express')
const app = express()
const urlPrefix = '/api'
const mongoose = require('mongoose')
const fs = require('fs');
const { url } = require('inspector')
const helmet = require('helmet');
const  morgan = require('morgan')
const cert = fs.readFileSync('keys/localhost.pem');
const options = {
    server:{sslCA:cert}
};

const connstring = "mongodb+srv://admin:admin@cluster0.9hippzx.mongodb.net/?retryWrites=true&w=majority&ssl=true"

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');


mongoose.connect(connstring)
.then(() =>
{
     console.log('Connected :-)')
})
.catch((error) =>
{
    console.log('NOT connected :-(')
    console.log(error.message)
},options);


app.use(express.json())

app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});

app.use(helmet());
app.use(morgan('combined'));

app.use(urlPrefix+'/user',userRoutes);
app.use(urlPrefix+'/post',postRoutes);

module.exports = app