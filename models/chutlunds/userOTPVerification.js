
const mongoose = require('mongoose');
const db_desiakahaniya=require('../../config/desiKahaniya_dbConnect')


const UserOTPVerificationSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true },

    otp: { type: String, required: true },


}, { });


mongoose.models = {}
module.exports = db_desiakahaniya.model('otp', UserOTPVerificationSchema)


