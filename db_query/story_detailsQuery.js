const StoryModel = require('../models/StoryModel')  // main story page
const StoryItemModel = require('../models/StoryItemModel') //homepage story item


exports.checkStoryExists = async function (story) {
    const storyExist = await StoryModel.findOne({ href: story })
    return storyExist

}

exports.saveStory = async function (data) {
    const story = new StoryModel(data)
    await story.save()
}



exports.checkStoryItemExists = async function (Title) {
    const storyItemExist = await StoryItemModel.findOne({ Title: Title })
    return storyItemExist

}

exports.saveStoryItem = async function (data) {
    const storyItem = new StoryItemModel(data)
    await storyItem.save()
}


exports.DB_COUNT = async function () {
    return StoryItemModel.count();
}



exports.getStoryItemByPage = async function (page) {
    let skip = parseInt(page) * 12 - 12
    const items = await StoryItemModel.find().sort({ 'date': -1 }).skip(skip).limit(12)
    return items
}






