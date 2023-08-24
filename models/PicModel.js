const mongoose = require('mongoose');
const db_desiakahaniya=require('../config/desiKahaniya_dbConnect')


const PicDetailSchema = new mongoose.Schema({

    href: { type: String, unique: true },
    imageArray: [{ type: String }],

}, { timestamps: true })

mongoose.models = {}
module.exports = db_desiakahaniya.model('PicModel', PicDetailSchema)

