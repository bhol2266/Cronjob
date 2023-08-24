
const mongoose = require('mongoose');
const db_desiakahaniya=require('../config/desiKahaniya_dbConnect')

const CodeoutsSchema = new mongoose.Schema({

    FirstName: { type: String },
    LastName: { type: String },
    Email: { type: String },
    completeDate: { type: Number },
    phoneNumber: { type: Number },


}, { timestamps: true })

mongoose.models = {}
module.exports = db_desiakahaniya.model('Codeouts', CodeoutsSchema)

