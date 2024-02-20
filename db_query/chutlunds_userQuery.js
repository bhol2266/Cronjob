const User = require("../models/chutlunds/user")
const UserOTPVerification = require("../models/chutlunds/userOTPVerification")



exports.checkUserExists_DB = async function (email) {
    const userExist = await User.findOne({ email: email })
    return userExist
}

exports.saveUser_DB = async function (firstName, lastName, email, hashpass, verified, country, loggedIn) {
    const user = new User({ firstName: firstName, lastName: lastName, email: email, password: hashpass, verified: verified, country: country, loggedIn: loggedIn })
    await user.save()

}

exports.updateUser_DB = async function (query, update) {
    await User.updateOne(query, update, { upsert: true })


}
exports.readData_DB = async function (query, update) {
    await User.updateOne(query, update, { upsert: true })
}




exports.saveOTP_DB = async function (email, otp) {
    const saveOTP = new UserOTPVerification({ email: email, otp: otp })
    await saveOTP.save()

}

exports.updateOTP_DB = async function (email, otp) {
    var newOTP = { $set: { otp: otp } };
    var query = { 'email': email };

    await UserOTPVerification.updateOne(query, newOTP, { upsert: true })

}


exports.matchOTP_DB = async function (otp) {
    const otpMatched = await UserOTPVerification.findOne({ otp: otp })
    if (otpMatched) {
        return true
    } else {
        return false
    }

}

exports.deleteOTP_DB = async function (otp) {
    await UserOTPVerification.deleteOne({ otp: otp })
}




