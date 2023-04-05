const admin = require('firebase-admin');
const serviceAccount_AudltDesiKahani = require('./Adult Desi Kahaniya/serviceAccountKey.json')
const serviceAccount_HindiDesiKahani = require('./Hindi Desi Kahaniya/serviceAccountKey.json')
const serviceAccount_DesiKahaniNextjs = require('./serviceAccountKey.json')

//multiple firebase account initialize

const desikahaniAdult = {
    credential: admin.credential.cert(serviceAccount_AudltDesiKahani),
    databaseURL: 'https://desikahani-c7af3-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const hindi_desi_kahani = {
    credential: admin.credential.cert(serviceAccount_HindiDesiKahani),
    databaseURL: 'https://hindi-desi-kahani-2-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const desiKahaniNextjs = {
    credential: admin.credential.cert(serviceAccount_DesiKahaniNextjs),
    storageBucket: 'gs://desikahaninextjs-ffab3.appspot.com'

};

const admin_Adult_DK = admin.initializeApp(desikahaniAdult, 'admin_Adult_DK');
const admin_Hindi_DK = admin.initializeApp(hindi_desi_kahani, 'admin_Hindi_DK');
const admin_DesiKahaniNextjs = admin.initializeApp(desiKahaniNextjs, 'admin_DesiKahaniNextjs');

module.exports = {
    admin_Adult_DK,
    admin_Hindi_DK,
    admin_DesiKahaniNextjs
};
