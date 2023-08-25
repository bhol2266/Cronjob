const VideoItem = require('../models/josporn/VideoItems');
const VideoDetail = require('../models/josporn/VideoDetail');


exports.checkVideoDetailsExist_DB = async function (title) {
    const videoDetailsExist = await VideoDetail.findOne({ title: title })
    return videoDetailsExist
}

exports.checkVideoItemExist_DB = async function (title) {
    const videoItemExist = await VideoItem.findOne({ title: title })
    return videoItemExist
}

exports.saveVideoItem = async function (data) {
    const videoItem = new VideoItem(data)
    await videoItem.save()
}

exports.saveVideoDetail = async function (data) {
    const videoDetail = new VideoDetail(data)
    await videoDetail.save()
}

exports.randomVideolist = async function () {
    const items = await VideoItem.aggregate([{ $sample: { size: 50 } }])
    return items
}



exports.getVideoItemByPage = async function (page) {
    let skip = parseInt(page) * 40 - 40
    if (skip < 0) {
        skip = 0
    }
    const items = await VideoItem.find().sort({ 'date': -1 }).skip(skip).limit(40)
    return items
}



exports.getVideoItemByCategory = async function (page, category) {
    let skip = parseInt(page) * 40 - 40
    if (skip < 0) {
        skip = 0
    }
    const items = await VideoItem.find({ catergories: category }).sort({ 'date': -1 }).skip(skip).limit(40)
    return items
}

exports.VIDEOITEMS_DB_COUNT = async function () {
    return VideoItem.count();
}


exports.VIDEOITEMS_DB_COUNT_CATEGORY = async function (category) {
    const count = await VideoDetail.countDocuments({ catergories: category });
    return count;
};

