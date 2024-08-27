const axios = require('axios');
const cron = require('node-cron');

const desiKahani_DeployHook =
  "https://www.hindisexstory.app/api/revalidate?secret=sadfsadfdsafdsafasdfsdafdsafsadfdsaf";
const chutlundscom_DeployHook =
  "https://api.render.com/deploy/srv-cqm7899u0jms73fmnro0?key=P3rdc1kT1FE";
const fuckvideolive_DeployHook =
  "https://api.render.com/deploy/srv-cr619ujv2p9s73akvfv0?key=JpyMY4gvTvQ";

function runDeployhooks() {
  try {
    // Revalidate cron job running daily at midnight
    cron.schedule("0 0 * * *", async () => {
      await fetch(desiKahani_DeployHook)
      await fetch(fuckvideolive_DeployHook)
      await fetch(chutlundscom_DeployHook)

    });


    cron.schedule('0 12 * * *', async () => {

      await fetch(fuckvideolive_DeployHook)
      await fetch(chutlundscom_DeployHook)
      await fetch(desiKahani_DeployHook)

    });




  } catch (error) {
    console.error(error);
  }
}

module.exports = { runDeployhooks };
