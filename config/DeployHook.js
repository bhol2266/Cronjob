const axios = require('axios');
const cron = require('node-cron');

const desiKahani_DeployHook = "https://www.hindisexstory.app/api/revalidate?secret=sadfsadfdsafdsafasdfsdafdsafsadfdsaf";
const chutlundscom_DeployHook = "https://api.vercel.com/v1/integrations/deploy/prj_oEGWJhZ1RWP2ge98o4uihr5X6APO/waFij5v1TT";
const fuckvideolive_DeployHook = "https://api.vercel.com/v1/integrations/deploy/prj_YUSE0fmgDMbTDx4YQ5xdFKxcePXc/wRo3dZ41mC";

async function triggerDeployHook(url) {
  try {
    await axios.post(url);
    console.log(`Successfully triggered deploy hook: ${url}`);
  } catch (error) {
    console.error(`Error triggering deploy hook: ${url}`, error.message);
  }
}

function runDeployhooks() {
  // Revalidate cron job running daily at midnight
  cron.schedule("0 0 * * *", async () => {
    await triggerDeployHook(desiKahani_DeployHook);
    await triggerDeployHook(fuckvideolive_DeployHook);
    await triggerDeployHook(chutlundscom_DeployHook);
  });

  // Another cron job running daily at noon
  cron.schedule('0 12 * * *', async () => {
    await triggerDeployHook(fuckvideolive_DeployHook);
    await triggerDeployHook(chutlundscom_DeployHook);
    await triggerDeployHook(desiKahani_DeployHook);
  });
}

module.exports = { runDeployhooks };
