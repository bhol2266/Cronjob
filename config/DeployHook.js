const axios = require('axios');
const cron = require('node-cron');
const { pushLatestVideos } = require('../Utils/desikahaniya');

const desiKahani_DeployHook = "https://www.hindisexstory.app/api/revalidate?secret=sadfsadfdsafdsafasdfsdafdsafsadfdsaf";
const chutlunds_revalidateHook = "https://chutlunds.com/api/revalidate?secret=sadfsadfdsafdsafasdfsdafdsafsadfdsaf";
const fuckvideolive_revalidateHook = "https://www.fuckvideo.live/api/revalidate?secret=sadfsadfdsafdsafasdfsdafdsafsadfdsaf";

const chutlundscom_DeployHook = "https://api.vercel.com/v1/integrations/deploy/prj_4YCm6CdlF3Nhix1PzrtyLh6zaPOu/EZQugZ0DVi";
const fuckvideolive_DeployHook = "https://api.vercel.com/v1/integrations/deploy/prj_MD83WGQSbQgkBDBsqAg3s4GE0Lhy/rNrF0FU5YG";

async function triggerDeployHook(url) {
  try {
    await axios.post(url);
    console.log(`Successfully triggered deploy hook: ${url}`);
  } catch (error) {
    console.error(`Error triggering deploy hook: ${url}`, error.message);
  }
}

async function runDeployhooks() {
  await pushLatestVideos();


  // Revalidate cron job running daily at midnight
  cron.schedule("0 0 * * *", async () => {
    await pushLatestVideos();
    await triggerDeployHook(chutlunds_revalidateHook);
    await triggerDeployHook(fuckvideolive_revalidateHook);
    await triggerDeployHook(desiKahani_DeployHook);

  });

  // Another cron job running daily at noon
  cron.schedule('0 12 * * *', async () => {
    await pushLatestVideos();
    await triggerDeployHook(chutlunds_revalidateHook);
    await triggerDeployHook(fuckvideolive_revalidateHook);
    await triggerDeployHook(desiKahani_DeployHook);
  });
}

module.exports = { runDeployhooks };
