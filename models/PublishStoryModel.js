const mongoose = require('mongoose');

const PublishStorySchema = new mongoose.Schema({

    Title: { type: String },
    author: { type: String },
    email: { type: String },
    shortDescription: { type: String },
    content: { type: String },
    suggestedCategory: { type: String },
    publishStatus: { type: Boolean, default: false },

}, { timestamps: true })

mongoose.models = {}
module.exports = mongoose.model('PublishStoryModel', PublishStorySchema)

