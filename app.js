const express = require('express')
const app = express()
const port = 3000
const schedule = require('node-schedule');
const axios = require('axios');

// const rule = new schedule.RecurrenceRule();
// // rule.hour = 0;
// rule.minute = 35;
// // rule.tz = 'Etc/UTC';
schedule.scheduleJob('0 0 */2 * *', function () {
    const chutlundslive_DeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_35llC1epMrjIFZMX7ympxwUXzF7P/5wF67DyvB2'
    const desiKahani_DeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_B3rQ4A5oZTfQvkLzIKw5l5QubA6m/TedDS2ajn7'
    const chutlundscom_DeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_Ug2Ps3DBCILSKTXGxJwrPWQgHuYF/6FDww8cuPV'

    axios.get(chutlundslive_DeployHook)
    axios.get(desiKahani_DeployHook)
    axios.get(chutlundscom_DeployHook)

    const d = new Date();
    let time = d.getTime();
    console.log("Deployed at :", time);

});
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})