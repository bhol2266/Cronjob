const fs = require('fs');
const axios = require('axios');
const AWS = require('aws-sdk');

// Configure AWS with your access key and secret key
AWS.config.update({
  accessKeyId: 'AKIA2GRWMVIN5REWZH4T',
  secretAccessKey: 'W9i/qSMI91RT3hrLS7R4kgqZiARxPUS5cwwv4+CS'
});

// Create a new instance of the S3 object
const s3 = new AWS.S3();


// URL of the audio file to download
var audioUrl = '';

// S3 bucket information
var bucketName = 'bucket2266/Sexstory_Audiofiles';
var key = ''; // The object key to be used in S3

// Download the audio file from URL
async function downloadAudio() {
  try {
    const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
    const audioData = response.data;
    return audioData;
  } catch (error) {
    console.error('Error downloading audio:', error);
    throw error;
  }
}

// Upload the audio data to S3
async function uploadToS3(data) {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: data,
    };
    const result = await s3.upload(params).promise();
    console.log('File uploaded successfully:', result.Location);
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
}


async function checkFileExists() {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };
    const headResult = await s3.headObject(params).promise();
    return true; // File exists
  } catch (error) {
    if (error.code === 'NotFound') {
      return false; // File does not exist
    } else {
      console.error('Error checking file existence:', error);
      throw error;
    }
  }
}

// Main function


async function uploadAudioFile(href, date) {

  const url=href.substring(0,href.length-1)
  const startIndex = url.lastIndexOf('/') + 1;
  const extractedSubstring = url.substring(startIndex);
  const capitalizedSubstring = extractedSubstring.charAt(0).toUpperCase() + extractedSubstring.slice(1);

  key = extractedSubstring + ".mp3"//filename
  audioUrl = "https://cdn2.freesexkahani.com/" + date.year + "/" + date.month + "/" + capitalizedSubstring + ".mp3";

  try {
    const fileExists = await checkFileExists();

    if (fileExists) {
      console.log('File already exists in S3.');
    } else {
      const audioData = await downloadAudio();
      await uploadToS3(audioData);
    }
  } catch (error) {
    console.error('Main error:', error);
  }

  console.log("*/*******************************************************/");
}

module.exports = { uploadAudioFile }

