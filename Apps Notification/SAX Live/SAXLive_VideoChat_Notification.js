const { admin_SAXLive_VideoChat } = require("../../firebase.js");
const {indianWomenNames,imagesArray}= require("../../config/dataResource.js");


// Get a reference to the FCM messaging service
const messaging = admin_SAXLive_VideoChat.messaging();

exports.SAXLive_VideoChat_Notification = async () => {
  const db = admin_SAXLive_VideoChat.database();

  const sendNotificationRef = db.ref("LiveVideoChat4/Send_Notification");
  sendNotificationRef.once("value", async (snapshot) => {
    const sendNotification = snapshot.val();

    if (sendNotification === "active") {
      //send notification

      // Define the notification payload

      function getRandomIndianWomenName() {
        const randomIndex = Math.floor(Math.random() * indianWomenNames.length);
        return indianWomenNames[randomIndex];
      }
      function getRandomIndianImage() {
        const randomIndex = Math.floor(Math.random() * imagesArray.length);
        return imagesArray[randomIndex];
      }
      const notiObject = {
        title: "Hey Sexy Girls lovers!",
        body: "💋"+getRandomIndianWomenName()+" has opened a live broadcast, join now!💋",
        image:getRandomIndianImage(),
      };

      const extradata = {
        KEY1: "Notification_Storyyy",
      };

      const payload = {
        notification: notiObject,
        data: extradata,
        topic: '/topics/all'

      };
      // Send the notification to all devices
      messaging.send(payload)
        .then((response) => {
          console.log(
            "Successfully sent notification: SAX Live VideoChat",
            response
          );
        })
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
    } else {
      console.log("SAX Live VideoChat Notification is Disabled from Admin");
    }
  });
};
