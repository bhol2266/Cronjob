const mongoose = require('mongoose');

const StoryDetailSchema = new mongoose.Schema({

    Title: { type: String },
    href: { type: String },
    author: { name: { type: String }, href: { type: String } },
    date: { type: String },
    views: { type: String },
    description: [{ type: String }],
    audiolink: { type: String },
    storiesLink_insideParagrapgh: [{ title: { type: String }, href: { type: String } }],
    category: { title: { type: String }, href: { type: String } },
    tagsArray: [{ type: String }],
    relatedStoriesLinks: [{ title: { type: String }, href: { type: String } }],


}, {  timestamps: true })

mongoose.models={}
module.exports = mongoose.model('StoryModel', StoryDetailSchema)

