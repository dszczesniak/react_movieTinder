const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:10
    },
    picture:{
        type:String,
        default:'n/a'
    }
}, { timestamps:true })

const Movie = mongoose.model('Movie',movieSchema)

module.exports = { Movie }