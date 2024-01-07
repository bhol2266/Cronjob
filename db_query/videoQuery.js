const VideoItemModel = require('../models/VideoItemModel') //homepage story item
const VideoModel = require('../models/VideoModel') //homepage story item


exports.checkVideoExists = async function (href) {
    try {
        const videoExist = await VideoModel.findOne({ href: href })
        return videoExist
    } catch (error) {
        return null

    }

}

exports.saveVideo = async function (data) {
    const video = new VideoModel(data)
    await video.save()
}

// exports.deleteVideoDetail = async function () {
//     await StoryModel.deleteMany({ date: "" })
// }

exports.randomVideolist = async function (month, year) {
    const items = await VideoItemModel.aggregate([{ $sample: { size: 20 } }])
    return items
}



exports.checkVideoItemExists = async function (story) {
    try {
        const videoExist = await VideoItemModel.findOne({ href: story })
        return videoExist
    } catch (error) {
        return null

    }

}


exports.saveVideoItem = async function (data) {


    const storyItem = new VideoItemModel(data)
    await storyItem.save()
}


exports.VIDEOITEMS_DB_COUNT = async function () {

    try {
        return VideoItemModel.count();
    } catch (error) {
        return 0

    }
}

exports.getVideoItemByPage = async function (page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }

    try {
        const items = await VideoItemModel.find().sort({ 'completeDate': -1 }).skip(skip).limit(12)
        return items
    } catch (error) {
        return null

    }


}


exports.getVideoItems_DB_COUNT_TAGS = async function (query) {


    try {
        return VideoItemModel.find(query).count();
    } catch (error) {
        return 0

    }
}

exports.getVideoItemsByTag = async function (query, page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }

    try {
        const items = await VideoItemModel.find(query).sort({ 'completeDate': -1 }).skip(skip).limit(12)
        return items
    } catch (error) {
        return null

    }

}