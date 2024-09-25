const mongoose = require('mongoose');
const db_desiakahaniya=require('../config/desiKahaniya_dbConnect')


const StoryDetailSchema = new mongoose.Schema({

    Title: {type: String},
    newTitle: {type: String},
    href:  {type: String, unique: true},
    author: { name: { type: String }, href: { type: String } },
    date: { type: String },
    completeDate: { type: Number },
    views: { type: String },
    description: [{ type: String }],
    audiolink: { type: String },
    storiesLink_insideParagrapgh: [{ title: { type: String }, href: { type: String } }],
    category: { title: { type: String }, href: { type: String } },
    tagsArray: [{ type: String }],
    relatedStoriesLinks: [{ title: { type: String }, href: { type: String } }],


}, { timestamps: true })

mongoose.models = {}
module.exports = db_desiakahaniya.model('StoryModel', StoryDetailSchema)

