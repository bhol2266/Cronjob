
const mongoose = require('mongoose');

const PicItemSchema = new mongoose.Schema({

    Title: { type: String, unique: true },
    thumbnail: { type: String },
    date: { day: { type: String }, month: { type: String }, year: { type: String }, },
    completeDate: { type: Number },
    fullalbum_href: { type: String },


}, { timestamps: true })

mongoose.models = {}
module.exports = mongoose.model('PicItemModel', PicItemSchema)

