
const mongoose = require('mongoose');

const CodeoutsSchema = new mongoose.Schema({

    FirstName: { type: String },
    LastName: { type: String },
    Email: { type: String },
    completeDate: { type: Number },
    phoneNumber: { type: Number },


}, { timestamps: true })

mongoose.models = {}
module.exports = mongoose.model('Codeouts', CodeoutsSchema)

