const { admin_DesiKahaniNextjs } = require("./firebase.js");

const db = admin_DesiKahaniNextjs.firestore();
const realtimeDb = admin_DesiKahaniNextjs.database(); // Initialize the Realtime Database

async function getTotalDocumentCount_TAG(tag) {
  const snapshot = await db.collection('Desi_Porn_Videos')
    .where('uploaded', '==', true)
    .where('tags', 'array-contains', tag)
    .get();

  return snapshot.size; // Returns the number of documents
}

async function getTotalDocumentCount() {
  const snapshot = await db.collection('Desi_Porn_Videos')
    .where('uploaded', '==', true)
    .get();

  return snapshot.size; // Returns the number of documents
}

async function runCode() {
  let CategoriesObject = {};

  const data = require('./Categories.json');

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const count = await getTotalDocumentCount_TAG(element.category);
    CategoriesObject[element.category] = String(count);
    console.log(CategoriesObject);

  }

  let totalVideos = await getTotalDocumentCount();

  await realtimeDb.ref('CategoriesVideoCount').set(CategoriesObject);
  await realtimeDb.ref('TotalVideos').set(String(totalVideos));
}

runCode();
