const admin = require('firebase-admin');
const serviceAccount_AudltDesiKahani = require('./Apps Notification/Adult Desi Kahaniya/serviceAccountKey.json')
const serviceAccount_HindiDesiKahani = require('./Apps Notification/Hindi Desi Kahaniya/serviceAccountKey.json')
const serviceAccount_DesiKahaniNextjs = require('./serviceAccountKey.json')
const serviceAccount_DesiKahaniOlds = require('./Apps Notification/Desi Kahani Old/serviceAccountKey.json')
const serviceAccount_AudltDesiKahani_2 = require('./Apps Notification/Adult Desi Kahaniya 2/serviceAccountKey.json')
const serviceAccount_DesiGirls_VideoChat = require('./Apps Notification/DesiGirls VideoChat/serviceAccountKey.json')


const serviceAccount_DesiGirls_VideoChat2 = require('./Apps Notification/Live Desi Girls 2/serviceAccountKey.json')
const serviceAccount_DesiGirls_VideoChat3 = require('./Apps Notification/Live Desi Girls 3/serviceAccountKey.json')
const serviceAccount_SAXLive_VideoChat = require('./Apps Notification/SAX Live/serviceAccountKey.json')
const serviceAccount_ChatMeet = require('./Apps Notification/ChatMeet/serviceAccountKey.json')
const serviceAccount_ChatHub = require('./Apps Notification/ChatHub/serviceAccountKey.json')


//multiple firebase account initialize

const desikahaniAdult = {
    credential: admin.credential.cert(serviceAccount_AudltDesiKahani),
    databaseURL: 'https://desikahani-c7af3-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const desikahaniAdult2 = {
    credential: admin.credential.cert(serviceAccount_AudltDesiKahani_2),
    databaseURL: 'https://desikahaniyaadult2-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const hindi_desi_kahani = {
    credential: admin.credential.cert(serviceAccount_HindiDesiKahani),
    databaseURL: 'https://hindi-desi-kahani-2-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const desiKahaniNextjs = {
    credential: admin.credential.cert(serviceAccount_DesiKahaniNextjs),
    storageBucket: 'gs://desikahaninextjs-ffab3.appspot.com',
    databaseURL: 'https://desikahaninextjs-ffab3-default-rtdb.asia-southeast1.firebasedatabase.app/',


};

const desiKahaniOld = {
    credential: admin.credential.cert(serviceAccount_DesiKahaniOlds),
    databaseURL: 'https://hot-hindi-story-default-rtdb.firebaseio.com/',

};

const desiGirls_VideoChat = {
    credential: admin.credential.cert(serviceAccount_DesiGirls_VideoChat),
    databaseURL: 'https://live-video-chat-67104-default-rtdb.asia-southeast1.firebasedatabase.app/',

};

const desiGirls_VideoChat2 = {
    credential: admin.credential.cert(serviceAccount_DesiGirls_VideoChat2),
    databaseURL: 'https://live-video-chat-2-default-rtdb.asia-southeast1.firebasedatabase.app/',

};
const desiGirls_VideoChat3 = {
    credential: admin.credential.cert(serviceAccount_DesiGirls_VideoChat3),
    databaseURL: 'https://live-video-chat-2-ad65b-default-rtdb.asia-southeast1.firebasedatabase.app/',

};

const saxLive_VideoChat = {
    credential: admin.credential.cert(serviceAccount_SAXLive_VideoChat),
    databaseURL: 'https://live-video-chat-4-default-rtdb.europe-west1.firebasedatabase.app/',

};

const ChatMeet = {
    credential: admin.credential.cert(serviceAccount_ChatMeet),
    databaseURL: 'https://live-video-chat-5-fdc3a-default-rtdb.asia-southeast1.firebasedatabase.app/',

};

const ChatHub = {
    credential: admin.credential.cert(serviceAccount_ChatHub),
    databaseURL: 'https://saxchat-2-default-rtdb.asia-southeast1.firebasedatabase.app/',

};


const admin_Adult_DK = admin.initializeApp(desikahaniAdult, 'admin_Adult_DK');
const admin_Adult2_DK = admin.initializeApp(desikahaniAdult2, 'admin_Adult2_DK');
const admin_Hindi_DK = admin.initializeApp(hindi_desi_kahani, 'admin_Hindi_DK');
const admin_DesiKahaniNextjs = admin.initializeApp(desiKahaniNextjs, 'admin_DesiKahaniNextjs');
const admin_DesiKahaniOld = admin.initializeApp(desiKahaniOld, 'admin_DesiKahaniOld');
const admin_DesiGirls_Videochat = admin.initializeApp(desiGirls_VideoChat, 'admin_DesiGirls_VideoChat');
const admin_DesiGirls_Videochat2 = admin.initializeApp(desiGirls_VideoChat2, 'admin_DesiGirls_VideoChat2');
const admin_DesiGirls_Videochat3 = admin.initializeApp(desiGirls_VideoChat3, 'admin_DesiGirls_VideoChat3');
const admin_SAXLive_VideoChat = admin.initializeApp(saxLive_VideoChat, 'admin_SAXLive_VideoChat');
const admin_ChatMeet = admin.initializeApp(ChatMeet, 'admin_ChatMeet');
const admin_ChatHub = admin.initializeApp(ChatHub, 'admin_ChatHub');

module.exports = {
    admin_Adult_DK,
    admin_Adult2_DK,
    admin_Hindi_DK,
    admin_DesiKahaniNextjs,
    admin_DesiKahaniOld,
    admin_DesiGirls_Videochat,
    admin_DesiGirls_Videochat2,
    admin_DesiGirls_Videochat3,
    admin_SAXLive_VideoChat,
    admin_ChatMeet,
    admin_ChatHub
};
