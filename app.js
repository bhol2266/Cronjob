const express = require('express')
const app = express()
const port = 3000
const schedule = require('node-schedule');
const axios = require('axios');

const rule = new schedule.RecurrenceRule();
// rule.hour = 0;
rule.minute = 41;
// rule.tz = 'Etc/UTC';
schedule.scheduleJob(rule, function () {
    const url = 'https://dummyjson.com/products/1'
    axios.get(url).then(resp => {
        console.log(resp.data);
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})