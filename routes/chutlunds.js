const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const { checkUserExists_DB, saveUser_DB, updateUser_DB, readData_DB, saveOTP_DB, updateOTP_DB, matchOTP_DB, deleteOTP_DB } = require("../db_query/chutlunds_userQuery");



router.post("/fb_googleLogin", async (req, res) => {

    const { firstName, lastName, email, password, country } = req.body

    try {
        //User not found
        const userExist = await checkUserExists_DB(email)
        if (!userExist) {

            const salt = await bcrypt.genSalt(10);
            const hashpass = await bcrypt.hash(password, salt)
            await saveUser_DB(firstName, lastName, email, hashpass, true, country, true)
        }

        return res.status(200).send({ success: true, data: { membership: false, email: email }, message: 'Logged In' })


    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }
});


router.post("/forgotPassword", async (req, res) => {

    const { email, password } = req.body

    try {

        if (await checkUserExists_DB(email) === null) {
            res.status(400).send({ sucess: false, message: 'User not found' })
            return
        }

        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, salt)

        var query = { 'email': email };
        var update = { $set: { password: hashpass } };
        await updateUser_DB(query, update)

        return res.status(200).send({ sucess: true, data: { email: email }, message: 'Password Updated' })


    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }
});


router.post("/login", async (req, res) => {


    const { email, password } = req.body

    try {
        //User not found
        const userExist = await checkUserExists_DB(email)
        if (!userExist) {
            return res.status(401).send({ sucess: false, message: 'User not found' })
        }


        //Incorrect passowrd
        const passwordMatched = await bcrypt.compare(password, userExist.password);
        if (!passwordMatched) {
            return res.status(401).send({ sucess: false, message: 'Password Incorrect' })
        }

        //Not Verfied , Maybe user closed the browser in OTP enter page during first signUp

        if (!userExist.verified) {
            const sendOTPforVerification = async (email) => {

                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: true,
                    service: 'Gmail',

                    auth: {
                        user: 'ukdevelopers007@gmail.com',
                        pass: 'mgwazngquiafczws',
                    }

                });

                var otp = Math.floor(1000 + Math.random() * 9000);
                otp = parseInt(otp);

                var mailOptions = {
                    to: email,
                    subject: "FuckVideo account activation",
                    html: "<h3>OTP for account verification of FuckVideo.com is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
                };


                transporter.sendMail(mailOptions, async (error, info) => {
                    if (error) {
                        return res.status(200).send({ sucess: false, message: error })
                    }

                    await updateOTP_DB(email, otp)

                });
            }
            sendOTPforVerification(email)
            return res.status(200).send({ sucess: true, data: { email: email }, message: 'OTP Sent' })
        }


        return res.status(200).send({ sucess: true, data: { membership: userExist.membership, email: email, DB_id: userExist._id }, message: 'Logged In' })


    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }



});


router.post("/logout", async (req, res) => {


    const { email } = req.body

    try {
        //User not found
        const userExist = await checkUserExists_DB(email)
        if (!userExist) {
            return res.status(401).send({ sucess: false, email: email, message: 'User not found' })
        }

        var query = { 'email': email };
        var update = { $set: { loggedIn: false } };
        await updateUser_DB(query, update)


        return res.status(200).send({ sucess: true, message: 'Logged Out' })

    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }



});


router.post("/OTP_verfiedLogin", async (req, res) => {


    const { email } = req.body

    try {

        const userID = await checkUserExists_DB(email)

        const payload = {
            email: email,
            id: userID._id
        }

        //After logged in a token is generated, which have to be saved in the  cookie  in browser
        const accessToken = jwt.sign(payload, process.env.ACCESSTOKEN_SECRET_CODE, { expiresIn: accessTokenExpiry })
        const refreshToken = jwt.sign(payload, process.env.REFRESHTOKEN_SECRET_CODE, { expiresIn: '100d' })

        //Saving Refresh token into Mongodb database
        var query = { 'email': email };
        var update = { $set: { refreshToken: refreshToken } };
        await (query, update)


        res.status(200).send({ sucess: true, accountType: "credentials", email: email, accessToken: "Bearer " + accessToken, refreshToken: refreshToken, message: 'Logged In' })


    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }



});

router.post("/register", async (req, res) => {


    const { firstName, lastName, email, password, country } = req.body

    try {
        if (await checkUserExists_DB(email) !== null) {
            res.status(400).send({ sucess: false, message: 'Already Resgistered' })
            return
        }

        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(password, salt)

        await saveUser_DB(firstName, lastName, email, hashpass, false, country, false)

        const sendOTPforVerification = async (email) => {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: true,
                service: 'Gmail',

                auth: {
                    user: 'ukdevelopers007@gmail.com',
                    pass: 'mgwazngquiafczws',
                }

            });

            var otp = Math.floor(1000 + Math.random() * 9000);
            otp = parseInt(otp);

            var mailOptions = {
                to: email,
                subject: "FuckVideo account activation",
                html: "<h3>OTP for account verification of FuckVideo.com is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    return res.status(200).send({ sucess: false, message: error })
                }
                console.log(info);

                await saveOTP_DB(email, otp)
                return res.status(200).send({ sucess: true, data: { email: email }, message: 'OTP Sent' })

            });
        }


        sendOTPforVerification(email)

    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }



});


router.post("/resendOTP", async (req, res) => {


    const { email } = req.body

    try {
        const sendOTPforVerification = async (email) => {

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: true,
                service: 'Gmail',

                auth: {
                    user: 'ukdevelopers007@gmail.com',
                    pass: 'mgwazngquiafczws',
                }

            });

            var otp = Math.floor(1000 + Math.random() * 9000);
            otp = parseInt(otp);

            var mailOptions = {
                to: email,
                subject: "Otp for registration is: ",
                html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
            };

            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    return res.status(200).send({ sucess: false, message: error })
                }

                await updateOTP_DB(email, otp)
                return res.status(200).send({ sucess: true, message: 'OTP Sent Again!' })

            });


        }

        //User not found
        const userExist = await checkUserExists_DB(email)
        if (!userExist) {
            return res.status(401).send({ sucess: false, message: 'User not found' })
        }

        await sendOTPforVerification(email)

    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }



});




router.post("/updateCountry", async (req, res) => {


    const { email, country } = req.body

    try {
        //User not found
        const userExist = await checkUserExists_DB(email)
        if (!userExist) {
            return res.status(401).send({ sucess: false, message: 'User not found' })
        }

        var query = { 'email': email };
        var update = { $set: { country: country } };
        await updateUser_DB(query, update)


        return res.status(200).send({ sucess: true, message: 'Country Updated!' })

    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }



});

router.post("/updatekeywords", async (req, res) => {


    const { searchKey, email } = req.body

    try {
        const userExists = await checkUserExists_DB(email)

        if (userExists === null) {
            res.status(400).send({ sucess: false, message: 'User not found' })
            return
        }

        let newArray = []
        const previousKeywords = userExists.keywords

        if (previousKeywords.length === 0) {
            newArray.push(searchKey)
        } else {
            newArray.push(searchKey)
            previousKeywords.forEach(key => {
                if (key !== searchKey) {
                    newArray.push(key)
                }
            })
        }


        var query = { 'email': email };
        var update = { $set: { keywords: newArray } };
        await updateUser_DB(query, update)

        return res.status(200).send({ sucess: true, data: { keywords: newArray }, message: 'Keywords Update' })

    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }



});



router.post("/updateloggedIn", async (req, res) => {


    const { email } = req.body

    try {
     //User not found
     const userExist = await checkUserExists_DB(email)
     if (!userExist) {
         return res.status(401).send({ sucess: false, message: 'User not found' })
     }
 
     var query = { 'email': email };
     var update = { $set: { loggedIn: true } };
     await updateUser_DB(query, update)
 
 
     return res.status(200).send({ sucess: true, message: 'Logged In' })

    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }



});


router.post("/verifyOtp", async (req, res) => {


    const { email, otp } = req.body;

    try {
        console.log(email, "verifyOTP");

        const matched = await matchOTP_DB(otp)
        if (!matched) {
            return res.status(200).send({ sucess: false, message: 'OTP Incorrect' })
        }
    
        //After verified delete the otp from DB
        await deleteOTP_DB(otp)
    
        var query = { 'email': email };
        var update = { $set: { verified: true } };
        await updateUser_DB(query, update)
    
        return res.status(200).send({ sucess: true, data: { email: email }, message: 'OTP Verified' })

    } catch (error) {
        return res.status(200).send({ success: false, message: 'something went wrong in server' })
    }



});


