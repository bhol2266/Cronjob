const PublishStoryModel = require('../models/PublishStoryModel')  // main story page


exports.checkPublishStoryExist = async function (title, email) {
    const storyExist = await PublishStoryModel.findOne({ Title: title, email: email })
    return storyExist

}

exports.savePublishStory = async function (data) {
    const story = new PublishStoryModel(data)
    await story.save()
}


exports.DB_COUNT = async function () {
    return StoryItemModel.count();
}

exports.deleteStoryDetail = async function () {
    await StoryModel.deleteMany({ date: "" })
}











