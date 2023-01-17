const Codeouts = require('../models/Codeouts')  // main story page



exports.saveForm = async function (data) {
    const form = new Codeouts(data)
    await form.save()
}