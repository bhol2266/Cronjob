
const mongoose = require('mongoose');
const db_desiakahaniya=require('../config/desiKahaniya_dbConnect')


const PicItemSchema = new mongoose.Schema({

    Title: { type: String, unique: true },
    thumbnail: { type: String },
    date: { day: { type: String }, month: { type: String }, year: { type: String }, },
    completeDate: { type: Number },
    fullalbum_href: { type: String },


}, { timestamps: true })

mongoose.models = {}
module.exports = db_desiakahaniya.model('PicItemModel', PicItemSchema)

