const mongoose = require('mongoose');
const db_desiakahaniya=require('../../config/desiKahaniya_dbConnect')


const UserSchema = new mongoose.Schema({

    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    verified: { type: Boolean, default: false },
    membership: { type: Boolean, default: false },
    keywords: [{ type: String }],
    country: { type: String },
    loggedIn: { type: Boolean, default: false },


}, { timestamps: true })


mongoose.models = {}
module.exports = db_desiakahaniya.model('User', UserSchema)



