const { admin_Adult_DK } = require("../firebase.js")


const { singleRandomStoryForNotification } = require('../db_query/story_detailsQuery')


// Get a reference to the FCM messaging service
const messaging = admin_Adult_DK.messaging();


exports.Adult_desi_kahaniya_Notification = async () => {
  const imageUrl = "https://hotdesipics.co/wp-content/uploads/2023/03/Ameer-Ladki-Aur-Gareeb-Boy-Ka-Affair-_009-150x300.jpg";
  let finalDataArray = await singleRandomStoryForNotification()
  let obj = finalDataArray[0];
  const db = admin_Adult_DK.database();
  const ref = db.ref(`Notification/${Date.now()}`);

  ref.set({
    Title: obj.Title,
    Heading: obj.description.join("\n\n"),
    Date: obj.date,
    Notification_ImageURL: imageUrl
  }, (error) => {
    if (error) {
      console.error('Error writing document', error);
    } else {

      // Define the notification payload
      const notiObject = {
        title: obj.Title,
        body: "पूरी कहानी पढ़ें",
        image: imageUrl,
        icon: "app_icon",
      };

      const extradata = {
        KEY1: "Notification_Story",
      };

      const payload = {
        notification: notiObject,
        data: extradata,

      };


      // Send the notification to all devices
      messaging.sendToTopic('/topics/all', payload)
        .then((response) => {
          console.log('Successfully sent notification:Desi Kahani Adult', response);
        })
        .catch((error) => {
          console.error('Error sending notification:', error);
        });
    }
  });



}

