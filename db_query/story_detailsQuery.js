const StoryModel = require('../models/StoryModel')  // main story page
const StoryItemModel = require('../models/StoryItemModel') //homepage story item


exports.checkStoryExists = async function (href) {
    const storyExist = await StoryModel.find({ href: href })
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

exports.DB_COUNT_CATEGORY = async function (query) {
    return StoryItemModel.find(query).count();
}

exports.DB_COUNT_TAGS = async function (query) {
    return StoryItemModel.find(query, 'tags').count();
}

exports.getStoryItemByPage = async function (page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }
    const items = await StoryItemModel.find().sort({ 'completeDate': -1 }).skip(skip).limit(12)
    return items
}

exports.getStoryItemByPageCategory = async function (category, page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }
    const items = await StoryItemModel.find({ category: category }).sort({ 'completeDate': -1 }).skip(skip).limit(12)
    return items
}


exports.getStoryItemByPageTag = async function (query, page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }
    const items = await StoryItemModel.find(query).sort({ 'completeDate': -1 }).skip(skip).limit(12)
    return items
}


exports.getStoryItemByAuthor = async function (author) {
    const items = await StoryItemModel.find({ 'author.href': author })
    return items
}

exports.getStoryItemByDate = async function (month, year, page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    } const items = await StoryItemModel.find({ 'date.month': month, 'date.year': year }).sort({ 'completeDate': -1 }).skip(skip).limit(12)
    return items
}

exports.getStoryItemByDateCOUNT = async function (month, year) {
    return StoryItemModel.find({ 'date.month': month, 'date.year': year }).count();
}



exports.randomLatestStories = async function (month, year) {

    const items = await StoryItemModel.aggregate([
        { $match: { 'date.month': month } }, // filter the results
        { $sample: { size: 5 } } // You want to get 5 docs
    ]);

    return items
}

exports.deleteStoryDetail = async function (href) {
    await StoryModel.deleteOne({ href: href })
}

exports.getAllStoryItems = async function () {
    const storyItemsArray = await StoryModel.find()
    return storyItemsArray
}











