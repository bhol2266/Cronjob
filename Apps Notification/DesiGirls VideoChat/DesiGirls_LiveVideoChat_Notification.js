const { admin_DesiGirls_Videochat } = require("../../firebase.js");
const indianWomenNames = [
  "Aishwarya",
  "Ananya",
  "Aditi",
  "Bhavna",
  "Chitra",
  "Deepika",
  "Esha",
  "Fatima",
  "Gauri",
  "Hina",
  "Isha",
  "Jyoti",
  "Kajal",
  "Lakshmi",
  "Meera",
  "Neha",
  "Ojaswini",
  "Pooja",
  "Radhika",
  "Sakshi",
  "Tanvi",
  "Vaishali",
  "Yamini",
  "Zara",
  "Aarti",
  "Binita",
  "Chandini",
  "Deepti",
  "Eshita",
  "Falguni",
  "Gita",
  "Hema",
  "Ishita",
  "Jasmine",
  "Kriti",
  "Lata",
  "Mala",
  "Nisha",
  "Preeti",
  "Rashi",
  "Trisha",
  "Urvashi",
  "Vandana",
];
const imagesArray=[
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/khubsoorat-mumbai-new-model-ki-nude-selfies/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/ghar-pe-nude-photos-leti-college-girl/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/sweet-desi-teen-girl-rupa-ki-nude-selfies/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/natkhat-desi-bhabhi-ke-mastram-nude-selfies/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/hot-indian-maal-nisha-ke-nange-photos-bhag-ll/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/desi-nri-girl-nisha-ke-hot-naked-photos/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/bade-boobs-wali-desi-hot-ladki/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/sexy-instagram-model-ki-nange-photos/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/desi-chudasi-bhabhi-ki-badi-gaand-doggystyle/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/sweet-desi-college-girl-ke-nude-leaks/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/nri-sexy-girl-ke-leaked-snapchat-nude-selfies/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/tharki-desi-bhabhi-ke-nude-big-boobs-photos/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/beautiful-desi-girl-ke-mast-naked-whatsapp-selfies/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/marathi-desi-wife-bathroom-mein-nangi-tasweerein/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/khubsoorat-agra-ki-jawaan-maal-ke-antarvasna-photos/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/behad-cute-nri-teen-jhanvi-ke-amazing-nude-photos/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/married-aurat-ke-nude-selfies-husband-se-leak/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/phul-jaise-dhikne-wali-indian-teen-ke-nude-selfies/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/ek-dum-mast-nri-girl-ke-nude-photos-huge-boobs-ke-saat/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/cute-indian-teen-apne-sweet-tits-expose-karte-huye/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/sweet-aur-masoom-desi-girl-ke-nude-pics/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/chudakad-muslim-biwi-apne-busty-nude-selfies-send-kiye/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/social-media-star-nudrat-zahra-chowdhury-ke-nude-pics/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/bangla-boudi-apne-bade-boobs-se-seduce-karte-huye/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/ek-dum-tagda-maal-mumbai-college-girl-nude-collection/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/doodh-wali-boobs-ke-saat-muslim-girl-ke-nude-selfies/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/desi-college-girl-ke-sexy-teasing-selfie-photos/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/muslim-shadishuda-biwi-ke-nude-photos-husband-leak-kiya/7.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/muslim-desi-girl-nude-apne-boyfriend-ke-saat/thumbnail.png",
  "https://bucket2266.blr1.cdn.digitaloceanspaces.com/FirebaseFolders/chulbuli-hyderabad-ki-desi-teen-nude-big-tits-ke-saat/thumbnail.png",
]

// Get a reference to the FCM messaging service
const messaging = admin_DesiGirls_Videochat.messaging();

exports.DesiGirls_VideoChat_Notification = async () => {
  const db = admin_DesiGirls_Videochat.database();

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
            "Successfully sent notification: DesiGirls VideoChat",
            response
          );
        })
        .catch((error) => {
          console.error("Error sending notification:", error);
        });
    } else {
      console.log("DesiGirls_VideoChat Notification is Disabled from Admin");
    }
  });
};
