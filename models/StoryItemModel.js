
const mongoose = require('mongoose');

const StoryItemSchema = new mongoose.Schema({

    Title: { type: String },
    author: { name: { type: String }, href: { type: String } },
    date: { type: Number },
    views: { type: String },
    description:{ type: String },
    href: { type: String },
    tags: [{ name: { type: String }, href: { type: String } }],
  

}, {  timestamps: true })

mongoose.models={}
module.exports = mongoose.model('StoryItemModel', StoryItemSchema)
