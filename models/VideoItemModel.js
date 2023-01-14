
const mongoose = require('mongoose');
const VideoItemSchema = new mongoose.Schema({

    Title: { type: String },
    thumbnail: { type: String },
    author: { name: { type: String }, href: { type: String } },
    date: { day: { type: String }, month: { type: String }, year: { type: String }, },
    completeDate: { type: Number },
    views: { type: String },
    description: { type: String },
    category: { name: { type: String }, href: { type: String } },
    href: { type: String },
    tags: [{ name: { type: String }, href: { type: String } }],


}, { timestamps: true })

mongoose.models = {}
module.exports = mongoose.model('VideoItemModel', VideoItemSchema)

