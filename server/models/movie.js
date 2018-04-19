const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:0,
        max:10
    },
    imageUrl:{
        type:String,
        default:'n/a'
    }
}, { timestamps:true })

const Movie = mongoose.model('Movie',movieSchema)

module.exports = { Movie }