const express = require('express')
const app = express()
const cron = require("node-cron");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const fs = require('fs')
const axios = require('axios');
const cheerio = require('cheerio');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { freeSexkahani } = require('./config/freeSexkahani');
const { videoPageData } = require('./config/videoPageData');
const { hotdesipics } = require('./config/hotdesipics');
const { fullalbum } = require('./config/fullalbumScrap');
const { freeSexkahaniStory_details } = require('./config/freeSexkahaniStory_details');
var cors = require('cors')
const { checkStoryExists, saveStory, checkStoryItemExists, saveStoryItem, DB_COUNT, getStoryItemByPage, DB_COUNT_CATEGORY, getStoryItemByPageCategory, DB_COUNT_TAGS, getStoryItemByPageTag, getStoryItemByAuthor, getStoryItemByDate, randomLatestStories, deleteStoryDetail, getStoryItemByDateCOUNT, deleteVideoDetail, getStoryItems_forApp } = require('./db_query/story_detailsQuery')

const { saveVideoItem, randomVideolist, checkVideoItemExists, VIDEOITEMS_DB_COUNT, getVideoItemByPage, getVideoItems_DB_COUNT_TAGS, getVideoItemsByTag, checkVideoExists, saveVideo } = require('./db_query/videoQuery')

const { savePublishStory, checkPublishStoryExist } = require('./db_query/publishStoryQuery')

const { saveForm, getAllforms } = require('./db_query/CodeoutsQuery')

const { checkPicItemExists, savePicItem, PICITEMS_DB_COUNT, getPicItemByPage, checkPicExists, savePic, randomPiclist } = require('./db_query/PicsQuery')
const tagJSON = require('./JsonData/TagsDetail.json')

const { freeSexkahaniVideo } = require("./config/freeSexkahaniVideo")
const chutlundslive_DeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_35llC1epMrjIFZMX7ympxwUXzF7P/5wF67DyvB2'
const desiKahani_DeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_B3rQ4A5oZTfQvkLzIKw5l5QubA6m/TedDS2ajn7'
const chutlundscom_DeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_Ug2Ps3DBCILSKTXGxJwrPWQgHuYF/6FDww8cuPV'



// const schedule = require('node-schedule');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require("mongoose");
const { LoginCredentials } = require('two-step-auth');
mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    () => {
        console.log("Mongoose Is Connected");
    }
);

// Middleware

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cors()) // Use this after the variable declaration


const categories = [

    {
        category_title: 'Aunty Sex Story',
        href: 'aunty-sex',
        description: `आंटी से सेक्स, चाची, मामी, बुआ मौसी की चुदाई कहानियाँ, पड़ोसन, मम्मी की सहेली, चाची की सहेली, दोस्त की मम्मी

        Aunty sex story Hindi me, apne se Badi umar ki aurat ka chodan, Chut Chudai ki Kahani
        
        Aunty sex stories about sex relation with neighbor aunties, elderly ladies`
    },

    {
        category_title: 'Audio Sex Story',
        href: 'audio-sex-story',
        description: `लड़की की सेक्सी आवाज में चुदाई की कहानी सुन कर मजा लें.

        `
    },


    {
        category_title: 'Bhabhi Sex',
        href: 'bhabhi-sex',
        description: `भाभी से सेक्स, चुदाई करने का अपना ही मजा है.

        Bhabhi chudai ki kahani, bhabi ki chut ki cudai ki kahani
        
        सारे लड़के  सगी भाभी, चचेरी ममेरी फुफेरी भाभी या पड़ोस की भाभी की चुत के सपने  देखते हैं. बहुत से मर्द खुशकिस्मत होते हैं जिन्हें भाभी की चुत की चुदाई करने का मौक़ा मिल जाता है.
        
        next door bhabhi ki chudai free Hindi sex story, Sex with Sis in law`
    },
    {
        category_title: 'Desi Kahani',
        href: 'desi-kahani',
        description: `हिंदी में देसी कहानी के मजे लें. ये सेक्सी कहानियाँ आप के लंड को खड़ा कर देंगी. लंड चूसने, चूत चोदने और गांड मारने के किस्से यहाँ विस्तार से लिखे गए हैं. खेतों में चूत चुदाई का मजा लें.

        Cock sucking, pussy fucking and anal sex action at its best in desi kahani with real Indian description and sex action described in a way that it will arouse you to fullest.
        
        Desi sex stories padhen jisme lund ko chusne ki, chut chudai ki aur gaand sex ki aisi baatein likhi he jis se aap ka lund khada ho jaye.`
    },

    {
        category_title: 'Family Sex Stories',
        href: 'family-sex-stories',
        description: `Hindi me Family Sex Stories ka maja len. Jija sali, devar bhabhi, bua, mausi, step bhai behan, step father daughter, step mother son sex kahaniya.
        यहाँ आपको रिश्तों में चुदाई की हिंदी कहानी बिल्कुल मुफ्त मिलेंगी.`
    },
    {
        category_title: 'First Time Sex',
        href: 'first-time-sex',
        description: `फर्स्ट टाइम सेक्स कुवारी लड़की या लड़के की पहली बार चुदाई की फ्री हिंदी कहानी
        first time sex story by virgin girl or boy.`
    },
    {
        category_title: 'Gay Sex Stories In Hindi',
        href: 'gay-sex-story-hindi',
        description: `गे सेक्स स्टोरीज हिंदी में, लड़कों, गांडू की गांड चुदाई की कहानी का मजा यहाँ लें.
        Homosexual Gay sex stories in Hindi, Gandu Chudai story.`
    },
    {
        category_title: 'Group Sex Stories',
        href: 'group-sex-stories',
        description: `ग्रुप सेक्स की हिंदी कहानियाँ जिनमें तीन चार या ज्यादा लड़के लड़कियाँ मिल कर चुदाई करते हैं.
        Group sex stories with threesome, foursome and orgies in Hindi for free.`
    },
    {
        category_title: 'Indian Sex Stories',
        href: 'indian-sex-stories',
        description: `sadfsadfsadf`
    },
    {
        category_title: 'Sali Sex',
        href: 'sali-sex',
        description: `जीजा साली सेक्स की छेड़छाड़ व चूत चुदाई की हिन्दी कहानियाँ
        Jija Sali ki chut Chudai Hindi Sex story, Sali Ki choot Chudai Ki kahani
        Incest Sex Stories sis in law and brother in law`
    },
    {
        category_title: 'Teacher Sex',
        href: 'teacher-sex',
        description: `टीचर के साथ सेक्स की कहानी, स्कूल कॉलेज या ट्यूशन टीचर के साथ चुदाई स्टोरी आप यहाँ पढ़ सकते हैं.
        school, college or tution teacher ki chudai ki kahani
        Sex With teacher`
    },
    {
        category_title: 'Teenage Girl',
        href: 'teenage-girl',
        description: `19 साल की टीनएज लड़की की चुदाई की कहानी हिंदी में पढ़ कर मजा लें. कमसिन जवान लड़की की चूत में लंड कैसे घुसा? आप पढ़ना चाहेंगे ना?
        Teenage girl free sex story in Hindi for you only.
        अगर आप टीनेज़ गर्ल की सेक्स क्लिप देखना चाहते हैं तो यहाँ क्लिक करें.`
    },
    {
        category_title: 'XXX Kahani',
        href: 'xxx-kahani',
        description: `XXX kahani Hindi mein, Desi Bhabhi, young Indian girl wild Sex story.
        क्सक्सक्स इन्डियन चुदाई कहानी, गर्म जवान लड़की, आंटी के साथ सेक्स स्टोरी हिंदी में पढ़ें और मजा लें.`
    },
    {
        category_title: 'अन्तर्वासना',
        href: 'antarvasna',
        description: `असली अन्तर्वासना कामुकता से भरी हिंदी सेक्स कहानियाँ,
        Original Antarvasna Hindi sex stories for free
        यह अन्तर्वासना सेक्स स्टोरीज की नयी साईट है. अन्तर्वासना के खुलने में परेशानी के कारण इस नयी साईट को शुरू किया गया है.`
    },
    {
        category_title: 'हिंदी सेक्स स्टोरीज',
        href: 'hindi-sex-stories',
        description: `Hindi Sex Stories of Desi Indian girl sex, bhabhi aunty Chut Chudai
        हिंदी सेक्स स्टोरी भाभी साली चाची की चूत चुदाई की, गांड चुदाई की कहानी
        इस साईट पर अन्तर्वासना की सभी हिंदी कहानियाँ एकदम मुफ्त में पढ़ें.`
    },

]


// Creating a cron job which runs on every 2days
try {

    cron.schedule('0 0 * * *', () => {
        axios.get("http://desikahaniya.in/api/revalidate?secret=sadfsadfdsafdsafasdfsdafdsafsadfdsaf").then(function (response) {
            console.log(response.data);
        }).catch(error => console.log(error))

    });

    cron.schedule("0 0 */3 * *", function () {
        console.log(Date.now, "Cronjob Executed");
        axios.get(chutlundslive_DeployHook).catch(error => console.log(error))
        // axios.get(desiKahani_DeployHook)
        axios.get(chutlundscom_DeployHook).catch(error => console.log(error))

    });
} catch (error) {

}


// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://desikahaninextjs-ffab3.appspot.com'
});
const bucket = admin.storage().bucket();





async function insertStoryThumbnail() {
    for (let index = 1; index < 303; index++) {
        let rawdata = fs.readFileSync(`./JsonData/homepage/${index}.json`);
        let data = JSON.parse(rawdata);

        const { finalDataArray } = data
        finalDataArray.forEach(async (item) => {
            await saveStoryItem(item)
        })
    }
}
async function insertVideoThumbnail() {
    for (let index = 1; index <= 78; index++) {
        let rawdata = fs.readFileSync(`./JsonData/Videos/${index}.json`);
        let data = JSON.parse(rawdata);

        const { finalDataArray } = data
        finalDataArray.forEach(async (item) => {
            await saveVideoItem(item)
        })
    }
}

async function insertPicThumbnail() {
    for (let index = 1; index <= 106; index++) {
        let rawdata = fs.readFileSync(`./JsonData/pics/${index}.json`);
        let data = JSON.parse(rawdata);
        data.forEach(async (item) => {
            await savePicItem(item)
        })
    }
}

// insertStoryThumbnail()
// insertVideoThumbnail()
// insertPicThumbnail()
//  insertpicToFirebase()

setTimeout(() => {
    deleteStoryDetail() // remove storyDetail documents that is not scrapped properly 
    // deleteVideoDetail() // remove storyDetail documents that is not scrapped properly 
}, 10000);



app.post('/story_detailsAPI', async (req, res) => {

    const { story, story_Category } = req.body
    let story_details = {}





    try {

        story_details = await checkStoryExists(story)
        if (story_details == null) {
            story_details = await freeSexkahaniStory_details(`https://www.freesexkahani.com/${story_Category}/${story}/`, story)
            await saveStory(story_details)
        }
    } catch (error) {
        // console.log(error);
        return res.status(200).json({ success: false, message: error })

    }

    return res.status(200).json({ success: true, data: story_details })
})




app.post('/HomepageStoriesUpdate', async (req, res) => {

    const { page } = req.body

    let pagination_nav_pages = []
    let finalDataArray_final = []
    pagination_nav_pages.push(page)

    try {
        if (page === "1") {
            const { finalDataArray, categoryTitle, categoryDescription, } = await freeSexkahani(`https://www.freesexkahani.com/page/1/`)
            finalDataArray.forEach(async (item) => {
                let obj = await checkStoryItemExists(item.Title)
                if (obj == null) {
                    await saveStoryItem(item)
                }
            })

        }


        let count = await DB_COUNT()

        let lastPage = Math.round(count / 12)
        pagination_nav_pages.push(lastPage.toString())


        finalDataArray_final = await getStoryItemByPage(page)

        return res.status(200).json({ success: true, data: { count: count, finalDataArray: finalDataArray_final, pagination_nav_pages: pagination_nav_pages } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


})


app.post('/category', async (req, res) => {

    const { category, page } = req.body
    let categoryTitle = ''
    let categoryDescription = ''
    categories.forEach(item => {
        if (item.href === category) {
            categoryTitle = item.category_title
            categoryTitle = item.category_title
            categoryDescription = item.description
        }
    })

    let pagination_nav_pages = []
    let finalDataArray = []

    pagination_nav_pages.push(page)

    try {

        let count = await DB_COUNT_CATEGORY({ category: categoryTitle })

        let lastPage = Math.round(count / 12)
        pagination_nav_pages.push(lastPage.toString())

        finalDataArray = await getStoryItemByPageCategory(categoryTitle, page)

        return res.status(200).json({ success: true, data: { count: count, finalDataArray: finalDataArray, pagination_nav_pages: pagination_nav_pages, categoryTitle: categoryTitle, categoryDescription: categoryDescription } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


})

app.post('/tag', async (req, res) => {

    const { tag, page } = req.body
    let categoryTitle = ''
    let categoryDescription = ''
    tagJSON.forEach(item => {
        if (item.href === tag) {
            categoryTitle = item.tag
            categoryDescription = item.description
        }
    })

    let pagination_nav_pages = []
    let finalDataArray = []

    pagination_nav_pages.push(page)

    try {
        const query = {
            "tags.name": categoryTitle,
        }
        let count = await DB_COUNT_TAGS(query)

        let lastPage = Math.round(count / 12)
        pagination_nav_pages.push(lastPage.toString())

        finalDataArray = await getStoryItemByPageTag(query, page)


        return res.status(200).json({ success: true, data: { count: count, finalDataArray: finalDataArray, pagination_nav_pages: pagination_nav_pages, categoryTitle: categoryTitle, categoryDescription: categoryDescription } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })
    }
})


app.post('/date', async (req, res) => {

    const { year, month, page } = req.body

    var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let categoryTitle = monthArray[parseInt(month.replace(/^0+/, '')) - 1] + "-" + year
    let categoryDescription = ""


    let pagination_nav_pages = []
    let finalDataArray = []

    pagination_nav_pages.push(page)
    let count = await getStoryItemByDateCOUNT(month, year)
    let lastPage = Math.round(count / 12)
    pagination_nav_pages.push(lastPage.toString())



    try {
        finalDataArray = await getStoryItemByDate(month, year, page)

        return res.status(200).json({ success: true, data: { finalDataArray: finalDataArray, categoryTitle: categoryTitle, categoryDescription: categoryDescription, pagination_nav_pages: pagination_nav_pages } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


})


app.post('/author', async (req, res) => {

    const { author } = req.body
    let categoryTitle = " " + author.replace("-", " ").replace("_", " ").toUpperCase()
    let categoryDescription = ''


    let finalDataArray = []


    try {

        finalDataArray = await getStoryItemByAuthor(author)

        return res.status(200).json({ success: true, data: { finalDataArray: finalDataArray, categoryTitle: categoryTitle, categoryDescription: categoryDescription } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


})


app.get('/latestStories', async (req, res) => {


    var date = new Date();
    var currentMonth = date.getMonth() + 1
    var currentYear = date.getFullYear()

    if (currentMonth < 10) {
        currentMonth = "0" + currentMonth.toString()
    } else {
        currentMonth = currentMonth.toString()
    }

    let finalDataArray = []


    try {
        finalDataArray = await randomLatestStories(currentMonth, currentYear.toString())
        return res.status(200).json({ success: true, data: { finalDataArray: finalDataArray } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }
})



app.post('/HomepageVideo', async (req, res) => {

    const { page } = req.body
    let categoryDescription = ""
    let categoryTitle = ""
    let pagination_nav_pages = []
    let finalDataArray_final = []
    pagination_nav_pages.push(page)

    try {
        if (page === "1") {
            const { finalDataArray, categoryTitle, categoryDescription, } = await freeSexkahaniVideo(`https://www.freesexkahani.com/videos/page/1/`)
            finalDataArray.forEach(async (item) => {
                let obj = await checkVideoItemExists(item.href)
                if (obj == null) {
                    await saveVideoItem(item)
                }
            })
        }

        let count = await VIDEOITEMS_DB_COUNT()

        let lastPage = Math.round(count / 12)
        pagination_nav_pages.push(lastPage.toString())


        finalDataArray_final = await getVideoItemByPage(page)

        return res.status(200).json({ success: true, data: { count: count, finalDataArray: finalDataArray_final, pagination_nav_pages: pagination_nav_pages, categoryDescription: categoryDescription, categoryTitle: categoryTitle } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


})


app.post('/VideoByTag', async (req, res) => {

    const { tag, page } = req.body
    let categoryDescription = ""
    let categoryTitle = tag.replace("-", " ").replace("-", " ").toUpperCase()

    let pagination_nav_pages = []
    let finalDataArray_final = []
    pagination_nav_pages.push(page)


    try {
        const query = {
            "tags.href": tag,
        }


        let count = await getVideoItems_DB_COUNT_TAGS(query)
        let lastPage = Math.round(count / 12)
        pagination_nav_pages.push(lastPage.toString())


        finalDataArray_final = await getVideoItemsByTag(query, page)


        return res.status(200).json({ success: true, data: { count: count, finalDataArray: finalDataArray_final, pagination_nav_pages: pagination_nav_pages, categoryDescription: categoryDescription, categoryTitle: categoryTitle } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


})





app.post('/videoPageData', async (req, res) => {

    const { video } = req.body
    let story_details = {}
    let finalDataArray_final = []

    try {

        story_details = await checkVideoExists(video)
        if (story_details == null) {
            story_details = await videoPageData(`https://www.freesexkahani.com/videos/${video}/`, video)
            await saveVideo(story_details)
        }

        finalDataArray_final = await randomVideolist()


    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


    return res.status(200).json({ success: true, story_details: story_details, finalDataArray: finalDataArray_final })
})


app.post('/HomepagePics', async (req, res) => {

    const { page } = req.body
    let pagination_nav_pages = []
    let finalDataArray_final = []
    pagination_nav_pages.push(page)
    try {
        if (page === "1") {
            const finalDataArray = await hotdesipics(`https://hotdesipics.co/main/page/${page}/`)
            finalDataArray.forEach(async (item) => {
                let obj = await checkPicItemExists(item.fullalbum_href)
                if (obj == null) {
                    await savePicItem(item)
                }
            })
        }

        let count = await PICITEMS_DB_COUNT()

        let lastPage = Math.round(count / 12)
        pagination_nav_pages.push(lastPage.toString())


        finalDataArray_final = await getPicItemByPage(page)

        //upload thumnail to firebase storage
        finalDataArray_final.forEach(async(obj)=>{

            const file = bucket.file(`picsItemModel/${obj.fullalbum_href}/thumbnail.png`);
            const [exists] = await file.exists();
            if (exists) {
                return
            } else {
                axios.get(obj.thumbnail, { responseType: 'arraybuffer' })
                    .then(response => {
                        // Upload the image to Firebase Storage
                        const file = bucket.file(`picsItemModel/${obj.fullalbum_href}/thumbnail.png`);
                        const buffer = Buffer.from(response.data, 'binary');
                        const stream = file.createWriteStream({
                            metadata: {
                                contentType: 'image/jpeg'
                            }
                        });
                        stream.on('error', err => console.error(err));
                        stream.on('finish', async () => {
                            // Get the download URL of the image
                            const downloadUrl = await file.getSignedUrl({
                                action: 'read',
                                expires: '03-09-2491' // Optional expiration date
                            });
                            // console.log('Download URL:', downloadUrl);
                        });
                        stream.end(buffer);
                    })
                    .catch(error =>
                        console.error("HomepagePics : " + error)
                    );
            }

        })
       

        return res.status(200).json({ success: true, data: { count: count, finalDataArray: finalDataArray_final, pagination_nav_pages: pagination_nav_pages } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


})

app.post('/fullalbum', async (req, res) => {

    const { photoAlbum } = req.body
    let dataobject = {}
    let finalDataArray_final = []


    try {

        dataobject = await checkPicExists(photoAlbum)
        if (dataobject == null) {
            dataobject = await fullalbum(photoAlbum)
            await savePic(dataobject)
        }


        const { href, imageArray } = dataobject

        //upload thumnail to firebase storage
        imageArray.forEach(async (imageUrl, index) => {
            const file = bucket.file(`picsModel/${href}/${index + 1}.png`);
            const [exists] = await file.exists();
            if (exists) {
                return
            } else {
                axios.get(imageUrl, { responseType: 'arraybuffer' })
                    .then(response => {
                        // Upload the image to Firebase Storage
                        const file = bucket.file(`picsModel/${href}/${index + 1}.png`);
                        const buffer = Buffer.from(response.data, 'binary');
                        const stream = file.createWriteStream({
                            metadata: {
                                contentType: 'image/jpeg'
                            }
                        });
                        stream.on('error', err => console.error(err));
                        stream.on('finish', async () => {
                            // Get the download URL of the image
                            const downloadUrl = await file.getSignedUrl({
                                action: 'read',
                                expires: '03-09-2491' // Optional expiration date
                            });
                            // console.log('Download URL:', downloadUrl);
                        });
                        stream.end(buffer);
                    })
                    .catch(error =>
                        console.error("imageArray : " + error)
                    );
            }
        })


        finalDataArray_final = await randomPiclist()

        finalDataArray_final.forEach(async (obj, index) => {
            const file = bucket.file(`picsItemModel/${obj.fullalbum_href}/thumbnail.png`);
            const [exists] = await file.exists();
            if (exists) {
                return
            } else {
                axios.get(obj.thumbnail, { responseType: 'arraybuffer' })
                    .then(response => {
                        // Upload the image to Firebase Storage
                        const file = bucket.file(`picsItemModel/${obj.fullalbum_href}/thumbnail.png`);
                        const buffer = Buffer.from(response.data, 'binary');
                        const stream = file.createWriteStream({
                            metadata: {
                                contentType: 'image/jpeg'
                            }
                        });
                        stream.on('error', err => console.error(err));
                        stream.on('finish', async () => {
                            // Get the download URL of the image
                            const downloadUrl = await file.getSignedUrl({
                                action: 'read',
                                expires: '03-09-2491' // Optional expiration date
                            });
                            // console.log('Download URL:', downloadUrl);
                        });
                        stream.end(buffer);
                    })
                    .catch(error =>
                        console.error("finalDataArray_final : " + error)
                    );
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


    return res.status(200).json({ success: true, dataobject: dataobject, finalDataArray: finalDataArray_final })
})





app.post('/codeouts', async (req, res) => {

    try {

        await saveForm(req.body)
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }

    return res.status(200).json({ success: true, message: "Form Uploaded" })
})

app.get('/codeoutsform', async (req, res) => {

    let forms = []
    try {

        forms = await getAllforms()
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }

    return res.status(200).json({ success: true, message: "Form Uploaded", data: forms })
})

app.post('/publishStory', async (req, res) => {

    try {

        const storyExist = await checkPublishStoryExist(req.body.Title, req.body.email)
        if (storyExist == null) {
            await savePublishStory(req.body)
            return res.status(200).json({ success: true, message: "Story sent for verification" })

        } else {
            return res.status(200).json({ success: true, message: "Story with same title exists" })

        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


})

//Deso Kahani Mobile App APIs
app.post('/updateStories_inDB', async (req, res) => {

    const { completeDate } = req.body
    console.log(completeDate);

    try {

        const storyItemsArray = await getStoryItems_forApp(parseInt(completeDate))
        console.log(storyItemsArray.length);
        if (storyItemsArray.length == null) {
            return res.status(200).json({ success: false, message: "no stories" })

        } else {
            return res.status(200).json({ success: true, data: storyItemsArray, message: "All story Items" })

        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }

})

app.post('/storiesDetails', async (req, res) => {

    const { href } = req.body
    const story_details = await checkStoryExists(href)
    return res.status(200).json({ success: true, data: story_details, message: href })

})
app.post('/storiesDetailsByTitle', async (req, res) => {

    const { Title } = req.body
    const story_details = await checkStoryItemExists(Title)
    if (story_details !== null) {
        const { href } = story_details

        const rough = href.substring(href.indexOf('.com/') + 5, href.length - 1)
        const category = rough.substring(0, rough.indexOf('/'))
        const story_href = rough.substring(rough.indexOf('/') + 1, rough.length)


        let newStoryDetails = await checkStoryExists(story_href)
        if (newStoryDetails == null) {
            newStoryDetails = await freeSexkahaniStory_details(`https://www.freesexkahani.com/${category}/${story_href}/`, story_href)
            await saveStory(newStoryDetails)
        }
        return res.status(200).json({ success: true, data: newStoryDetails, message: Title })

    } else {
        return res.status(200).json({ success: false, message: Title })
    }

})














app.listen(port, () => {
    console.log(`App running on port ${port}`)
})



