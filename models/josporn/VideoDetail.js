const mongoose = require('mongoose');
const db_josporn = require('../../config/josporn_dbConnect')

// Define the video schema
const videoDetail_Schema = new mongoose.Schema({
    title: { type: String, unique: true }, // Make the title field unique
    duration: String,
    like: String,
    dislike: String,
    src:{
        '720p': String,
        '480p': String,
        '360p': String,
        '240p': String
 
    },
    thumbnail: String,
    description: String,
    catergories: [String],
    href: String
});

// Create the Video model
const VideoDetail =db_josporn.models.VideoDetail || db_josporn.model('VideoDetail', videoDetail_Schema);

module.exports = VideoDetail;
