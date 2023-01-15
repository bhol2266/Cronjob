const mongoose = require('mongoose');

const PicDetailSchema = new mongoose.Schema({

    href: { type: String },
    imageArray: [{ type: String }],

}, {  timestamps: true })

mongoose.models={}
module.exports = mongoose.model('PicModel', PicDetailSchema)

