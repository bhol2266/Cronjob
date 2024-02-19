const fs = require('fs');

const { admin_Adult_DK, admin_Adult2_DK } = require("./firebase.js")
const db = admin_Adult_DK.firestore();
const db2 = admin_Adult2_DK.firestore();

let jsonData = require('./desikahaniya.storymodels.json');
jsonData.reverse();


const {
    freeSexkahaniStory_details,
} = require("./config/scrape/freeSexkahaniStory_details.js");

// Upload data to Firestore
async function uploadData() {
    try {
        for (const item of jsonData) {

            console.log(item.Title);
            if (item.Title != "") {
                await db.collection('storymodels').doc(item.Title).set(item);
                await db2.collection('storymodels').doc(item.Title).set(item);
            } 

        }
        console.log('Data uploaded successfully!');
    } catch (error) {
        console.error('Error uploading data:', error);
    }
}

uploadData();
