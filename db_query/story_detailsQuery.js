const StoryModel = require('../models/StoryModel')


exports.checkStoryExists = async function (story) {
    const storyExist = await StoryModel.findOne({ href: story })
    return storyExist

}

exports.saveStory = async function (data) {
    const story = new StoryModel(data)
    await story.save()
}








