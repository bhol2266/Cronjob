const { admin_Adult2_DK, admin_DesiKahaniOld, admin_Hindi_DK } = require('./firebase');

const db_source = admin_Adult2_DK.firestore();
const db_destination_desiKahaniOld = admin_DesiKahaniOld.firestore();
const db_destination_hindi_desiKahani = admin_Hindi_DK.firestore();

async function copyCollection(sourceCollectionPath, destinationCollections) {
  const collectionRef = db_source.collection(sourceCollectionPath);
  const snapshot = await collectionRef.get();

  if (snapshot.empty) {
    console.log(`No documents found in collection: ${sourceCollectionPath}`);
    return;
  }

  for (const doc of snapshot.docs) {
    const data = doc.data();
    for (const db_destination of destinationCollections) {
      await db_destination.collection(sourceCollectionPath).doc(doc.id).set(data);
      console.log(`Document ${doc.id} copied from ${sourceCollectionPath} to ${db_destination.projectId}`);
    }
  }
}

async function copySelectedCollections() {
  const collectionsToCopy = ['collection1', 'collection2']; // Replace with the actual collection names you want to copy
  const destinationDbs = [db_destination_desiKahaniOld, db_destination_hindi_desiKahani];

  for (const collectionName of collectionsToCopy) {
    await copyCollection(collectionName, destinationDbs);
  }

  console.log('Selected collections copied successfully.');
}

copySelectedCollections().catch(console.error);
