const cron = require('node-cron');

const notifications = [
  require("../Apps Notification/Adult Desi Kahaniya/Adult_desi_kahaniya_Notification"),
  require("../Apps Notification/Adult Desi Kahaniya 2/Adult_desi_kahaniya2_Notification"),
  require("../Apps Notification/Hindi Desi Kahaniya/Hindi_desi_kahaniya_Notification"),
  require("../Apps Notification/Desi Kahani Old/DesiKahani_Old_Notification"),
  require("../Apps Notification/DesiGirls VideoChat/DesiGirls_LiveVideoChat_Notification"),
  require("../Apps Notification/Live Desi Girls 2/LiveDesi_VideoChat2_Notification")
];

function showAppsNotification() {
  const schedules = [
    "0 22 * * *", // 10 PM
    "0 17 * * *", // 5 PM
    "0 10 * * *"  // 10 AM
  ];

  notifications.forEach(notification => {
    schedules.forEach(schedule => {
      cron.schedule(
        schedule,
        () => {
          notification();
        },
        {
          timezone: "Asia/Kolkata"
        }
      );
    });
  });
}

module.exports = { showAppsNotification };
