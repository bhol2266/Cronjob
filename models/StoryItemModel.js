
const mongoose = require('mongoose');

const StoryItemSchema = new mongoose.Schema({

    Title: { type: String },
    author: { name: { type: String }, href: { type: String } },
    date: { day: { type: String }, month: { type: String }, year: { type: String }, },
    completeDate: { type: Number },
    views: { type: String },
    description: { type: String },
    category: { type: String },
    href:  {type: String, unique: true},
    tags: [{ name: { type: String }, href: { type: String } }],


}, { timestamps: true })

mongoose.models = {}
module.exports = mongoose.model('StoryItemModel', StoryItemSchema)

