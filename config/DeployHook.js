const axios = require('axios');
const cron = require('node-cron');

const desiKahani_DeployHook =
  "https://api.vercel.com/v1/integrations/deploy/prj_lh3yPimt3Q7HwFlod7d23pJhYGh1/2jtbPzoURw";
const chutlundscom_DeployHook =
"https://api.render.com/deploy/srv-cm490v21hbls73acc7hg?key=mQhbf6al7u8";


function deployFuckVideo(){
  // cloudflare deployhook only work in post request
  const apiUrl = 'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/67e02649-ebca-4dd6-b24c-f89fd90c1fcf';

  axios.post(apiUrl, {}, {
    headers: {
      'Content-Type': 'application/json',
      // Add any required headers, such as authentication headers
      // Example: 'Authorization': 'Bearer YOUR_API_TOKEN'
    }
  })
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response.data);
  });
}


function runDeployhooks() {
  try {
    // Revalidate cron job running daily at midnight
    cron.schedule("0 0 * * *", () => {
      axios
        .get(
          "http://desikahaniya.in/api/revalidate?secret=sadfsadfdsafdsafasdfsdafdsafsadfdsaf"
        ).catch((error) => console.log(error));

        deployFuckVideo();
      
      axios
        .get(
          "https://api.render.com/deploy/srv-cm490v21hbls73acc7hg?key=mQhbf6al7u8"
        ).catch((error) => console.log(error));
      
    });

    // Deploy hooks cron job running every 3 days
    cron.schedule("0 0 */3 * *", () => {
      console.log(new Date(), "Cronjob Executed");
      axios.get(chutlundscom_DeployHook).catch((error) => console.log(error));
    });

  } catch (error) {
    console.error(error);
  }
}

module.exports = { runDeployhooks };
