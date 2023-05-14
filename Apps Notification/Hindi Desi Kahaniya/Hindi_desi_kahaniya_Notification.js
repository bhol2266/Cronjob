const { admin_Hindi_DK } = require("../../firebase.js")



const { singleRandomStoryForNotification } = require('../../db_query/story_detailsQuery')


// Get a reference to the FCM messaging service
const messaging = admin_Hindi_DK.messaging();


exports.Hindi_desi_kahaniya_Notification = async () => {

  const db = admin_Hindi_DK.database();

  const sendNotificationRef = db.ref('Hindi_desi_Kahani-2/Send_Notification');
  sendNotificationRef.once('value', async (snapshot) => {
    const sendNotification = snapshot.val();

    if (sendNotification === "active") {

      //remove all notification stories
      const rootRef = db.ref('Notification'); // Notification reference
      rootRef.remove()

      //save story to firebase notification database
      const imageUrl = process.env.Notification_image;
      let finalDataArray = await singleRandomStoryForNotification()
      let obj = finalDataArray[0];
      const ref = db.ref(`Notification/${Date.now()}`);

      //send notification
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
              console.log('Successfully sent notification: Hindi Desi Kahani', response);
            })
            .catch((error) => {
              console.error('Error sending notification:', error);
            });
        }
      });

    }{
      console.log("Hindi_desi_kahaniya Notification is Disabled from Admin");
    }
  });






 



}

