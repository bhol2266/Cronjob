const axios = require('axios');
const cron = require('node-cron');

const desiKahani_DeployHook =
  "https://api.vercel.com/v1/integrations/deploy/prj_lh3yPimt3Q7HwFlod7d23pJhYGh1/2jtbPzoURw";
const chutlundscom_DeployHook =
  "https://api.render.com/deploy/srv-cqm7899u0jms73fmnro0?key=P3rdc1kT1FE";


function deployFuckVideo() {
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

function deployChutlunds() {
  // cloudflare deployhook only work in post request
  axios.post(chutlundscom_DeployHook, {}, {
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
          "https://www.hindisexstory.app/api/revalidate?secret=sadfsadfdsafdsafasdfsdafdsafsadfdsaf"
        ).catch((error) => console.log(error));

      deployFuckVideo();
      deployChutlunds();

    });



  } catch (error) {
    console.error(error);
  }
}

module.exports = { runDeployhooks };
