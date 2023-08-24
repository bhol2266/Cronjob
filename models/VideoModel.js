const mongoose = require('mongoose');
const db_desiakahaniya=require('../config/desiKahaniya_dbConnect')


const VideoDetailSchema = new mongoose.Schema({

    Title: { type: String },
    thumbnail: { type: String },
    href: { type: String },
    videoLink: { type: String },
    description: [{ type: String }],
    category: { title: { type: String }, href: { type: String } },
    tagsArray: [{ type: String }],

}, {  timestamps: true })

mongoose.models={}
module.exports = db_desiakahaniya.model('VideoModel', VideoDetailSchema)

