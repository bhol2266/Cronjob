const VideoItemModel = require('../models/VideoItemModel') //homepage story item


exports.checkVideoItemExists = async function (story) {
    const videoExist = await VideoItemModel.findOne({ href: story })
    return videoExist
}

// exports.saveVideo = async function (data) {
//     const story = new VideoItemModel(data)
//     await story.save()
// }

exports.saveVideoItem = async function (data) {
    const storyItem = new VideoItemModel(data)
    await storyItem.save()
}


exports.VIDEOITEMS_DB_COUNT = async function () {
    return VideoItemModel.count();
}

exports.getVideoItemByPage = async function (page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }
    const items = await VideoItemModel.find().sort({ 'completeDate': -1 }).skip(skip).limit(12)
    return items
}


exports.getVideoItems_DB_COUNT_TAGS = async function (query) {
    return  VideoItemModel.find(query).count();
}

exports.getVideoItemsByTag = async function (query, page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }
    const items = await VideoItemModel.find(query).sort({ 'completeDate': -1 }).skip(skip).limit(12)
    return items
}