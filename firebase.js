const admin = require('firebase-admin');
const serviceAccount_AudltDesiKahani = require('./Apps Notification/Adult Desi Kahaniya/serviceAccountKey.json')
const serviceAccount_HindiDesiKahani = require('./Apps Notification/Hindi Desi Kahaniya/serviceAccountKey.json')
const serviceAccount_DesiKahaniNextjs = require('./serviceAccountKey.json')
const serviceAccount_DesiKahaniOlds = require('./Apps Notification/Desi Kahani Old/serviceAccountKey.json')
const serviceAccount_AudltDesiKahani_2 = require('./Apps Notification/Adult Desi Kahaniya 2/serviceAccountKey.json')

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
    storageBucket: 'gs://desikahaninextjs-ffab3.appspot.com'

};

const desiKahaniOld = {
    credential: admin.credential.cert(serviceAccount_DesiKahaniOlds),
    databaseURL: 'https://hot-hindi-story-default-rtdb.firebaseio.com/',

};

const admin_Adult_DK = admin.initializeApp(desikahaniAdult, 'admin_Adult_DK');
const admin_Adult2_DK = admin.initializeApp(desikahaniAdult2, 'admin_Adult2_DK');
const admin_Hindi_DK = admin.initializeApp(hindi_desi_kahani, 'admin_Hindi_DK');
const admin_DesiKahaniNextjs = admin.initializeApp(desiKahaniNextjs, 'admin_DesiKahaniNextjs');
const admin_DesiKahaniOld = admin.initializeApp(desiKahaniOld, 'admin_DesiKahaniOld');

module.exports = {
    admin_Adult_DK,
    admin_Adult2_DK,
    admin_Hindi_DK,
    admin_DesiKahaniNextjs,
    admin_DesiKahaniOld
};
