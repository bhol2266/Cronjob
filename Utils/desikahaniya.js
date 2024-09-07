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





module.exports = {
    queryBuilder,
    getTotalDocumentCountFunc,
    getTotalDocumentCountFuncQuery
};