const { admin_Adult_DK, admin_Adult2_DK } = require("../firebase.js")
const db = admin_Adult_DK.firestore();
const db2 = admin_Adult2_DK.firestore();

const { freeSexkahani } = require("../config/scrape/freeSexkahani");
const { freeSexkahaniStory_details } = require("../config/scrape/freeSexkahaniStory_details.js");
const cron = require('node-cron');



// Upload data to Firestore
async function upload_storyitemmodels_firestore(item) {
    try {
        if (item.Title != "") {
            await db.collection('storyitemmodels').doc(item.Title).set(item);
            await db2.collection('storyitemmodels').doc(item.Title).set(item);

            await upload_storymodels_firestore(item);

        }
        console.log('DesiKahani stories on Firestore updated successfully!');
    } catch (error) {
        console.error('Error upload_storyitemmodels_firestore data:', error);
    }
}

async function upload_storymodels_firestore(item) {

    const rough = item.href.substring(item.href.indexOf('.com/') + 5, item.href.length - 1)
    const story = rough.substring(rough.indexOf('/') + 1, rough.length)


    let story_details = await freeSexkahaniStory_details(item.href, story);

    try {
        if (story_details.Title != "") {
            await db.collection('storymodels').doc(story_details.Title).set(story_details);
            await db2.collection('storymodels').doc(story_details.Title).set(story_details);
        }

    } catch (error) {
        console.error('Error upload_storymodels_firestore data:', error);
    }
}


async function checkforLatestStories() {

    // cron job running daily at midnight

    cron.schedule("0 0 * * *", async () => {

        try {
            const { finalDataArray } = await freeSexkahani(`https://www.freesexkahani.com/page/1/`);
            finalDataArray.forEach(async (item) => {
                await upload_storyitemmodels_firestore(item);
            });
        } catch (error) {
            console.error('Error checkforLatestStories :', error);

        }

    });

}



module.exports = {
    checkforLatestStories
};
