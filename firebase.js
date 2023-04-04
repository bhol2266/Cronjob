const admin = require('firebase-admin');
const serviceAccount_AudltDesiKahani = require('./Adult Desi Kahaniya/serviceAccountKey.json')
const serviceAccount_HindiDesiKahani = require('./Hindi Desi Kahaniya/serviceAccountKey.json')



const config1 = {
    credential: admin.credential.cert(serviceAccount_AudltDesiKahani),
    databaseURL: 'https://desikahani-c7af3-default-rtdb.asia-southeast1.firebasedatabase.app/',
    storageBucket: 'gs://desikahaninextjs-ffab3.appspot.com'
};

const config2 = {
    credential: admin.credential.cert(serviceAccount_HindiDesiKahani),
    databaseURL: 'https://hindi-desi-kahani-2-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

const admin_Adult_DK = admin.initializeApp(config1, 'admin_Adult_DK');
const admin_Hindi_DK = admin.initializeApp(config2, 'admin_Hindi_DK');

module.exports = {
    admin_Adult_DK,
    admin_Hindi_DK
  };
