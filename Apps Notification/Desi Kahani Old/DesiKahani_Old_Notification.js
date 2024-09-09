const { admin_DesiKahaniOld } = require("../../firebase.js")



const { singleRandomStoryForNotification } = require('../../db_query/story_detailsQuery.js')


// Get a reference to the FCM messaging service
const messaging = admin_DesiKahaniOld.messaging();


exports.desiKahani_Old_Notification = async () => {

  const db = admin_DesiKahaniOld.database();

  const sendNotificationRef = db.ref('shareapp_url/Send_Notification');
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

          const payload = {
            notification: {
              title: obj.Title,
              body: "पूरी कहानी पढ़ें",
              image: imageUrl,
            },
            data: {
              KEY1: "Notification_Story",
            },
            topic: '/topics/all'
          };


          // Send the notification to all devices
          messaging.send(payload)
            .then((response) => {
              console.log('Successfully sent notification: Desi Kahani Old', response);
            })
            .catch((error) => {
              console.error('Error sending notification:', error);
            });
        }
      });

    } else{
      console.log("Desi Kahaniya offline Notification is Disabled from Admin");
    }
  });










}

