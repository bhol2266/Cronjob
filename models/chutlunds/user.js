const mongoose = require('mongoose');

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


}, { collection: "users", useCreateIndex: true, timestamps: true })


mongoose.models = {}
export default mongoose.model('User', UserSchema)


