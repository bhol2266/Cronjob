const express = require('express');
const router = express.Router();

const { saveForm, getAllforms } = require("../db_query/CodeoutsQuery");



router.post("/codeouts", async (req, res) => {
    try {
        await saveForm(req.body);
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }

    return res.status(200).json({ success: true, message: "Form Uploaded" });
});

router.get("/codeoutsform", async (req, res) => {
    let forms = [];
    try {
        forms = await getAllforms();
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }

    return res
        .status(200)
        .json({ success: true, message: "Form Uploaded", data: forms });
});


module.exports = router;

