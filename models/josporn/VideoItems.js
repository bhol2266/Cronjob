const mongoose = require('mongoose');
const db_josporn = require('../../config/josporn_dbConnect')


// Define the video schema
const videoItem_Schema = new mongoose.Schema({
    title: { type: String, unique: true }, // Make the title field unique
    duration: String,
    views: String,
    likePercent: String,
    thumbnail: String,
    screenshots: [String],
    catergories: [String],
    href: String,
    number: String,
    date:Number
});

// Create the Video model
const VideoItem =db_josporn.models.Video || db_josporn.model('Video', videoItem_Schema);

module.exports = VideoItem;
