const axios = require('axios');
const cron = require('node-cron');

const chutlundslive_DeployHook =
  "https://api.vercel.com/v1/integrations/deploy/prj_35llC1epMrjIFZMX7ympxwUXzF7P/5wF67DyvB2";
const desiKahani_DeployHook =
  "https://api.vercel.com/v1/integrations/deploy/prj_lh3yPimt3Q7HwFlod7d23pJhYGh1/2jtbPzoURw";
const chutlundscom_DeployHook =
  "https://api.vercel.com/v1/integrations/deploy/prj_uvelojDpqFoMlKsJfSXvKQENyJIZ/P9tB2VrHKK";

function runDeployhooks() {
  try {
    // Revalidate cron job running daily at midnight
    cron.schedule("0 0 * * *", () => {
      axios
        .get(
          "http://desikahaniya.in/api/revalidate?secret=sadfsadfdsafdsafasdfsdafdsafsadfdsaf"
        )
        .then(function (response) {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    });
  
    // Deploy hooks cron job running every 3 days
    cron.schedule("0 0 */3 * *", () => {
      console.log(new Date(), "Cronjob Executed");
      axios.get(chutlundslive_DeployHook).catch((error) => console.log(error));
    //   axios.get(desiKahani_DeployHook).catch((error) => console.log(error));
      axios.get(chutlundscom_DeployHook).catch((error) => console.log(error));
    });

  } catch (error) {
    console.error(error);
  }
}

module.exports = { runDeployhooks };
