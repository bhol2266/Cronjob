const { admin_DesiGirls_Videochat3 } = require("../../firebase.js");
const {indianWomenNames,imagesArray}= require("../../config/dataResource.js");


// Get a reference to the FCM messaging service
const messaging = admin_DesiGirls_Videochat3.messaging();

exports.DesiGirls_VideoChat3_Notification = async () => {
  const db = admin_DesiGirls_Videochat3.database();

  const sendNotificationRef = db.ref("Desi_Girls_Video_Chat/Send_Notification");
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
        title: "Hey Desi Girls lovers!",
        body: "💋"+getRandomIndianWomenName()+" has opened a live broadcast, join now!💋",
        image:getRandomIndianImage(),
        icon: "app_icon",
      };

      const extradata = {
        KEY1: "Notification_Storyyy",
      };

      const payload = {
        notification: notiObject,
        data: extradata,
      };
      // Send the notification to all devices
      messaging.sendToTopic("/topics/all", payload)
        .then((response) => {
          console.log(
            "Successfully sent notification: Live Desi Girls VideoChat 3",
            response
          );
        })
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
    } else {
      console.log("Live Desi Girls VideoChat 3 Notification is Disabled from Admin");
    }
  });
};
