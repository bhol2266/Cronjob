const mongoose = require('mongoose');
const db_desiakahaniya=require('../config/desiKahaniya_dbConnect')


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
module.exports = db_desiakahaniya.model('PublishStoryModel', PublishStorySchema)

