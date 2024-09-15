const { admin_DesiKahaniNextjs } = require("../firebase");
const db = admin_DesiKahaniNextjs.firestore();




async function queryBuilder({ sort, duration, pageNumber, pageSize }) {
    const skip = (pageNumber - 1) * pageSize;

    let query = db.collection('Desi_Porn_Videos')
        .where('publish', '==', true);

    // Apply sorting
    switch (sort) {
        case 'by_duration':
            query = query.orderBy('durationToSeconds', 'desc');
            break;
        case 'by_popularity':
            query = query.orderBy('viewsValue', 'desc');
            break;
        case 'by_rating':
            query = query.orderBy('likePercentValue', 'desc');
            break;
        default:
            query = query.orderBy('timestamp', 'desc');
            break;
    }

    // Apply duration filter
    switch (duration) {
        case 'lessthan_10':
            query = query.where('durationToSeconds', '<', 600); // less than 10 minutes
            break;
        case '10_to_40':
            query = query.where('durationToSeconds', '>=', 600).where('durationToSeconds', '<=', 2400); // between 10 and 40 minutes
            break;
        case 'morethan_40':
            query = query.where('durationToSeconds', '>', 2400); // more than 40 minutes
            break;
        default:
            // No additional duration filter
            break;
    }

    // Apply pagination
    const paginatedQuery = query.offset(skip).limit(pageSize);



    return { paginatedQuery };
}


async function getTotalDocumentCountFunc() {

    const realtimeDb = admin_DesiKahaniNextjs.database(); // Initialize the Realtime Database

    try {
        const totalVideosRef = realtimeDb.ref('TotalVideos');
        const snapshot = await totalVideosRef.once('value');
        const totalVideos = snapshot.val();

        return String(totalVideos)
    } catch (error) {
        console.error('Error fetching the field:', error);
    }
}

async function getTotalDocumentCountFuncQuery(sort, duration) {


    let query = db.collection('Desi_Porn_Videos')
        .where('publish', '==', true);

    // Apply sorting
    switch (sort) {
        case 'by_duration':
            query = query.orderBy('durationToSeconds', 'desc');
            break;
        case 'by_popularity':
            query = query.orderBy('viewsValue', 'desc');
            break;
        case 'by_rating':
            query = query.orderBy('likePercentValue', 'desc');
            break;
        default:
            query = query.orderBy('timestamp', 'desc');
            break;
    }

    // Apply duration filter
    switch (duration) {
        case 'lessthan_10':
            query = query.where('durationToSeconds', '<', 600); // less than 10 minutes
            break;
        case '10_to_40':
            query = query.where('durationToSeconds', '>=', 600).where('durationToSeconds', '<=', 2400); // between 10 and 40 minutes
            break;
        case 'morethan_40':
            query = query.where('durationToSeconds', '>', 2400); // more than 40 minutes
            break;
        default:
            // No additional duration filter
            break;
    }

    try {
        const snapshot = await query.count().get();
        const count = snapshot.data().count

        return String(count)
    } catch (error) {
        console.error('Error getting document count:', error);
        return "0"

    }
}


async function getRelatedVideos(tags) {


    function getRandomElement(arr) {
        if (arr.length === 0) {
            return undefined; // or handle empty array case as needed
        }
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    try {
        let query = db.collection('Desi_Porn_Videos')
            .where('publish', '==', true)
            .where('tags', 'array-contains', getRandomElement(tags))
            .orderBy('timestamp', 'desc');


        const videosSnapshot = await query.limit(100).get();


        const videos = videosSnapshot.docs.map(doc => {
            const data = doc.data();
            const videoTags = data.tags || [];
            const matchCount = tags.filter(tag => videoTags.includes(tag)).length;
            return { id: doc.id, ...data, matchCount };
        });


        // Sort videos by the number of matching tags in descending order
        const sortedVideos = videos.sort((a, b) => b.matchCount - a.matchCount);
        return sortedVideos;

    } catch (error) {
        console.error('Error fetching document:', error);
        throw error;
    }
}


async function pushLatestVideos() {
    // this is for updating videos on hindisexstory.app

    try {
        const collectionRef = db.collection('Desi_Porn_Videos'); // Replace with your collection name

        // Build the query
        const query = collectionRef
            .where('uploaded', '==', true) // Filter by field
            .orderBy('timestamp', 'desc') // Sort by timestamp, oldest to newest
            .limit(20);

        // Execute the query
        const snapshot = await query.get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }

        // Process the documents
        const documents = [];
        snapshot.forEach(doc => {
            documents.push({ id: doc.id, ...doc.data() });
        });


        for (let index = 0; index < documents.length; index++) {
            const doc = documents[index];
            await updateDocumentPublishById(doc.id)
        }


    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
    }
}




async function updateDocumentPublishById(docId) {
    try {
        if (!docId) {
            console.log('No document ID provided.');
            return;
        }

        const docRef = db.collection('Desi_Porn_Videos').doc(docId); // Replace with your collection name

        // Update the document field
        await docRef.update({
            publish: true,
            timestamp: new Date().toISOString() // Set timestamp to the current server time
        });
        console.log(`Document with ID ${docId} updated successfully.`);
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}





module.exports = {
    queryBuilder,
    getTotalDocumentCountFunc,
    getTotalDocumentCountFuncQuery,
    getRelatedVideos,
    pushLatestVideos
};