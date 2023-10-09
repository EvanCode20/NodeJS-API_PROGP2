const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    description: {type: String, required:true},
    subject:{type: String, required:true},
    userId:{type: String, required:true}
}) 

module.exports = mongoose.model('Post', postSchema)