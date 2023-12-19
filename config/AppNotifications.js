const cron = require('node-cron');



const { Adult_desi_kahaniya_Notification } = require("../Apps Notification/Adult Desi Kahaniya/Adult_desi_kahaniya_Notification");
const { Adult_desi_kahaniya_Notification2 } = require("../Apps Notification/Adult Desi Kahaniya 2/Adult_desi_kahaniya2_Notification.js");
const { Hindi_desi_kahaniya_Notification } = require("../Apps Notification/Hindi Desi Kahaniya/Hindi_desi_kahaniya_Notification");
const { desiKahani_Old_Notification } = require("../Apps Notification/Desi Kahani Old/DesiKahani_Old_Notification.js");
const { DesiGirls_VideoChat_Notification } = require("../Apps Notification/DesiGirls VideoChat/DesiGirls_LiveVideoChat_Notification.js");
const { DesiGirls_VideoChat2_Notification } = require("../Apps Notification/Live Desi Girls 2/LiveDesi_VideoChat2_Notification.js");
const { DesiGirls_VideoChat3_Notification } = require("../Apps Notification/Live Desi Girls 3/LiveDesi_VideoChat3_Notification.js");
const { SAXLive_VideoChat_Notification } = require("../Apps Notification/SAX Live/SAXLive_VideoChat_Notification.js");



function showAppsNotification() {


  // Creating a cron job which runs on every 2days
  try {

    cron.schedule(
      "0 22 * * *",
      () => {
        // Desi Kahaniya apps Notification
        // Running task every day at 10 PM Indian time
        Adult_desi_kahaniya_Notification();
        Adult_desi_kahaniya_Notification2();
        Hindi_desi_kahaniya_Notification();
        desiKahani_Old_Notification();
        DesiGirls_VideoChat_Notification();
        DesiGirls_VideoChat2_Notification();
        DesiGirls_VideoChat3_Notification();
        SAXLive_VideoChat_Notification();



      },
      {
        timezone: "Asia/Kolkata", // Set the timezone to Indian Standard Time
      }
    );

    cron.schedule(
      "0 17 * * *",
      () => {
        // Desi Kahaniya apps Notification
        // Running task every day at 5 PM Indian time
        Adult_desi_kahaniya_Notification();
        Adult_desi_kahaniya_Notification2();
        Hindi_desi_kahaniya_Notification();
        desiKahani_Old_Notification();
        DesiGirls_VideoChat_Notification();
        DesiGirls_VideoChat2_Notification();
        DesiGirls_VideoChat3_Notification();
        SAXLive_VideoChat_Notification();


      },
      {
        timezone: "Asia/Kolkata", // Set the timezone to Indian Standard Time
      }
    );

    cron.schedule(
      "0 10 * * *",
      () => {
        // Desi Kahaniya apps Notification
        // Running task every day at 10 AM Indian time
        Adult_desi_kahaniya_Notification();
        Adult_desi_kahaniya_Notification2();
        Hindi_desi_kahaniya_Notification();
        desiKahani_Old_Notification();
      },
      {
        timezone: "Asia/Kolkata", // Set the timezone to Indian Standard Time
      }
    );
  } catch (error) { }

}


module.exports = { showAppsNotification };
