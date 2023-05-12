const { admin_Adult2_DK } = require("../../firebase.js")


const { singleRandomStoryForNotification } = require('../../db_query/story_detailsQuery')


// Get a reference to the FCM messaging service
const messaging = admin_Adult2_DK.messaging();


exports.Adult_desi_kahaniya_Notification2 = async () => {
  const db = admin_Adult2_DK.database();
  const ref = db.ref(`Notification/${Date.now()}`);
  const sendNotificationRef = db.ref('Hindi_desi_Kahani_Adult/Send_Notification');
  sendNotificationRef.once('value', async(snapshot) => {
    const sendNotification = snapshot.val();

    if (sendNotification === "active") {

      const imageUrl = process.env.Notification_image;


      let finalDataArray = await singleRandomStoryForNotification()
      let obj = finalDataArray[0];


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
              console.log('Successfully sent notification:Desi Kahani Adult 2', response);
            })
            .catch((error) => {
              console.error('Error sending notification:', error);
            });
        }
      });
    }
  });

}

