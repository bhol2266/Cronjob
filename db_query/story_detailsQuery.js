const StoryModel = require('../models/StoryModel')  // main story page
const StoryItemModel = require('../models/StoryItemModel') //homepage story item


exports.checkStoryExists = async function (href) {
    try {
        const storyExist = await StoryModel.findOne({ href: href })
        return storyExist
    } catch (error) {
        return null

    }

}


exports.saveStory = async function (data) {
    const story = new StoryModel(data)
    try {
        await story.save()
    } catch (error) {
        return null

    }
}

exports.checkStoryItemExists = async function (Title) {

    try {

        const storyItemExist = await StoryItemModel.findOne({ Title: Title })
        return storyItemExist
    } catch (error) {
        return null

    }

}

exports.saveStoryItem = async function (data) {
    const storyItem = new StoryItemModel(data)
    await storyItem.save()
}

exports.DB_COUNT = async function () {

    try {
        return StoryItemModel.count();
    } catch (error) {
        return null

    }
}

exports.DB_COUNT_CATEGORY = async function (query) {

    try {
        return StoryItemModel.find(query).count();

    } catch (error) {
        return 0
    }
}

exports.DB_COUNT_TAGS = async function (query) {

    try {
        return StoryItemModel.find(query, 'tags').count();

    } catch (error) {
        return 0
    }
}

exports.getStoryItemByPage = async function (page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }

    try {
        const items = await StoryItemModel.find().sort({ 'completeDate': -1 }).skip(skip).limit(12)
        return items
    } catch (error) {
        return null
    }

}


exports.updateDocumentTitle = async (oldTitle, newTitle) => {  //remove after use
    try {
        console.log(oldTitle, newTitle);

        const result = await StoryModel.updateOne(
            { Title: oldTitle },
            { $set: { newTitle: newTitle } }, // Set the newTitle field
            // Create or update the new field
        );

        // Check if the update was successful
        if (result.modifiedCount > 0) {
            console.log('Update successful:', result);
            return { success: true, message: 'Update successful' };
        } else {
            console.log('No documents were updated.');
            return { success: false, message: 'No documents were updated' };
        }
    } catch (error) {
        console.error('Error updating document:', error);
        return { success: false, message: 'Error updating document' };
    }
};


exports.getStoryItemforUpdatingTitle = async function () {  //remove after use

    try {
        const items = await StoryModel.find().sort({ 'completeDate': -1 }).limit(50)
        return items
    } catch (error) {
        return null
    }

}

exports.getStoryItemByPageCategory = async function (category, page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }

    try {
        const items = await StoryItemModel.find({ category: category }).sort({ 'completeDate': -1 }).skip(skip).limit(12)
        return items
    } catch (error) {
        return null
    }

}


exports.getStoryItemByPageTag = async function (query, page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }

    try {
        const items = await StoryItemModel.find(query).sort({ 'completeDate': -1 }).skip(skip).limit(12)
        return items
    } catch (error) {
        return null
    }

}


exports.getStoryItemByAuthor = async function (author) {

    try {
        const items = await StoryItemModel.find({ 'author.href': author })
        return items
    } catch (error) {
        return null
    }

}

exports.getStoryItemByDate = async function (month, year, page) {
    let skip = parseInt(page) * 12 - 12
    if (skip < 0) {
        skip = 0
    }
    try {
        const items = await StoryItemModel.find({ 'date.month': month, 'date.year': year }).sort({ 'completeDate': -1 }).skip(skip).limit(12)
        return items
    } catch (error) {
        return null
    }


}

exports.getStoryItemByDateCOUNT = async function (month, year) {

    try {
        return StoryItemModel.find({ 'date.month': month, 'date.year': year }).count();

    } catch (error) {
        return 0
    }
}



exports.randomLatestStories = async function (month, year) {

    const items = await StoryItemModel.aggregate([
        { $match: { 'date.month': month } }, // filter the results
        { $sample: { size: 5 } } // You want to get 5 docs
    ]);

    try {
        const items = await StoryItemModel.aggregate([
            { $match: { 'date.month': month } }, // filter the results
            { $sample: { size: 5 } } // You want to get 5 docs
        ]);
        return items

    } catch (error) {
        return null
    }

}

exports.deleteStoryDetail = async function (href) {
    await StoryModel.deleteOne({ href: href })
}

exports.getStoryItems_forApp = async function (completeDate) {

    try {
        const storyItemsArray = await StoryModel.find({ completeDate: { $gt: completeDate } })
        return storyItemsArray

    } catch (error) {
        return null
    }

}

exports.singleRandomStoryForNotification = async function () {

    try {
        const items = await StoryModel.aggregate([
            { $match: {} }, // filter the results
            { $sample: { size: 1 } } // You want to get 5 docs
        ]);

        return items

    } catch (error) {
        return null
    }



}


//for web notification
exports.getLatestStory = async function () {
    try {
        // Find the latest story by sorting 'completeDate' in descending order and limiting to 1 result
        const latestStory = await StoryItemModel.findOne().sort({ 'completeDate': -1 });
        return latestStory;
    } catch (error) {
        console.error('Error fetching latest story:', error);
        return null;
    }
}











