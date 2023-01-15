const PicItemModel = require('../models/PicItemModel') //homepage story item
const PicModel = require('../models/PicModel') //homepage story item



exports.checkPicExists = async function (href) {
    const PicExist = await PicModel.findOne({ href: href })
    return PicExist

}

exports.savePic = async function (data) {
    const pic = new PicModel(data)
    await pic.save()
}

// exports.deleteVideoDetail = async function () {
//     await StoryModel.deleteMany({ date: "" })
// }

exports.randomPiclist = async function (month, year) {
    const items = await PicItemModel.aggregate([{ $sample: { size: 12 } }])
    return items
}












exports.checkPicItemExists = async function (fullalbum_href) {
    const videoExist = await PicItemModel.findOne({ fullalbum_href: fullalbum_href })
    return videoExist
}


exports.savePicItem = async function (data) {
    const storyItem = new PicItemModel(data)
    await storyItem.save()
}


exports.PICITEMS_DB_COUNT = async function () {
    return PicItemModel.count();
}

exports.getPicItemByPage = async function (page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }
    const items = await PicItemModel.find().sort({ 'completeDate': -1 }).skip(skip).limit(12)
    return items
}
