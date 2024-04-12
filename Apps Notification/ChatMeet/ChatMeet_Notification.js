const { admin_ChatMeet } = require("../../firebase.js");
const {indianWomenNames,imagesArray}= require("../../config/dataResource.js");


// Get a reference to the FCM messaging service
const messaging = admin_ChatMeet.messaging();

exports.ChatMeet_Notification = async () => {
  const db = admin_ChatMeet.database();

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
            "Successfully sent notification: ChatMeet",
            response
          );
        })
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
    } else {
      console.log("ChatMeet Notification is Disabled from Admin");
    }
  });
};
