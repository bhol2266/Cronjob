const { getLatestStory } = require("../db_query/story_detailsQuery.js");
const { admin_DesiKahaniNextjs } = require("../firebase.js");
const cron = require('node-cron');



async function HindiSexStory_Website() {

    let story = await getLatestStory()

    const message = {
        notification: {
            title: story.Title,
            body: "पूरी कहानी पढ़ें",
            image: "https://www.hindisexstory.app/android-chrome-192x192.png",
        },
        topic: 'all'
    };



    try {
        const response = await admin_DesiKahaniNextjs.messaging().send(message);
        console.log('Successfully sent message:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

async function sendWebsitesNotification() {


    cron.schedule(
        "0 10 * * *",
        () => {
            HindiSexStory_Website()
        },
        {
            timezone: "Asia/Kolkata", // Set the timezone to Indian Standard Time
        }
    );


    cron.schedule(
        "0 22 * * *",
        () => {
            HindiSexStory_Website()
        },
        {
            timezone: "Asia/Kolkata", // Set the timezone to Indian Standard Time
        }
    );


}




module.exports = { sendWebsitesNotification };

