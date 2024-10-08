const express = require('express');
const router = express.Router();
const { admin_DesiKahaniNextjs } = require("../firebase.js");
const cheerio = require("cheerio")



const { freeSexkahani } = require("../config/scrape/freeSexkahani");
const { videoPageData } = require("../config/scrape/videoPageData.js");
const { hotdesipics } = require("../config/scrape/hotdesipics");
const { fullalbum } = require("../config/scrape/fullalbumScrap");
const { uploadAudioFile } = require("../aws.js");


const {
    checkStoryExists,
    saveStory,
    checkStoryItemExists,
    saveStoryItem,
    DB_COUNT,
    getStoryItemByPage,
    DB_COUNT_CATEGORY,
    getStoryItemByPageCategory,
    DB_COUNT_TAGS,
    getStoryItemByPageTag,
    getStoryItemByAuthor,
    getStoryItemByDate,
    randomLatestStories,
    deleteStoryDetail,
    getStoryItemByDateCOUNT,
    deleteVideoDetail,
    getStoryItems_forApp,
    getStoryItemforUpdatingTitle,
    updateDocumentTitle,
} = require("../db_query/story_detailsQuery");

const {
    saveVideoItem,
    randomVideolist,
    checkVideoItemExists,
    VIDEOITEMS_DB_COUNT,
    getVideoItemByPage,
    getVideoItems_DB_COUNT_TAGS,
    getVideoItemsByTag,
    checkVideoExists,
    saveVideo,
} = require("../db_query/videoQuery");

const {
    savePublishStory,
    checkPublishStoryExist,
} = require("../db_query/publishStoryQuery");

const { freeSexkahaniVideo } = require("../config/scrape/freeSexkahaniVideo");

const bucket = admin_DesiKahaniNextjs.storage().bucket();


const categories = [
    {
        category_title: "Aunty Sex Story",
        href: "aunty-sex",
        description: `आंटी से सेक्स, चाची, मामी, बुआ मौसी की चुदाई कहानियाँ, पड़ोसन, मम्मी की सहेली, चाची की सहेली, दोस्त की मम्मी
  
          Aunty sex story Hindi me, apne se Badi umar ki aurat ka chodan, Chut Chudai ki Kahani
          
          Aunty sex stories about sex relation with neighbor aunties, elderly ladies`,
    },

    {
        category_title: "Audio Sex Story",
        href: "audio-sex-story",
        description: `लड़की की सेक्सी आवाज में चुदाई की कहानी सुन कर मजा लें.
  
          `,
    },

    {
        category_title: "Bhabhi Sex",
        href: "bhabhi-sex",
        description: `भाभी से सेक्स, चुदाई करने का अपना ही मजा है.
  
          Bhabhi chudai ki kahani, bhabi ki chut ki cudai ki kahani
          
          सारे लड़के  सगी भाभी, चचेरी ममेरी फुफेरी भाभी या पड़ोस की भाभी की चुत के सपने  देखते हैं. बहुत से मर्द खुशकिस्मत होते हैं जिन्हें भाभी की चुत की चुदाई करने का मौक़ा मिल जाता है.
          
          next door bhabhi ki chudai free Hindi sex story, Sex with Sis in law`,
    },
    {
        category_title: "Desi Kahani",
        href: "desi-kahani",
        description: `हिंदी में देसी कहानी के मजे लें. ये सेक्सी कहानियाँ आप के लंड को खड़ा कर देंगी. लंड चूसने, चूत चोदने और गांड मारने के किस्से यहाँ विस्तार से लिखे गए हैं. खेतों में चूत चुदाई का मजा लें.
  
          Cock sucking, pussy fucking and anal sex action at its best in desi kahani with real Indian description and sex action described in a way that it will arouse you to fullest.
          
          Desi sex stories padhen jisme lund ko chusne ki, chut chudai ki aur gaand sex ki aisi baatein likhi he jis se aap ka lund khada ho jaye.`,
    },

    {
        category_title: "Family Sex Stories",
        href: "family-sex-stories",
        description: `Hindi me Family Sex Stories ka maja len. Jija sali, devar bhabhi, bua, mausi, step bhai behan, step father daughter, step mother son sex kahaniya.
          यहाँ आपको रिश्तों में चुदाई की हिंदी कहानी बिल्कुल मुफ्त मिलेंगी.`,
    },
    {
        category_title: "First Time Sex",
        href: "first-time-sex",
        description: `फर्स्ट टाइम सेक्स कुवारी लड़की या लड़के की पहली बार चुदाई की फ्री हिंदी कहानी
          first time sex story by virgin girl or boy.`,
    },
    {
        category_title: "Gay Sex Stories In Hindi",
        href: "gay-sex-story-hindi",
        description: `गे सेक्स स्टोरीज हिंदी में, लड़कों, गांडू की गांड चुदाई की कहानी का मजा यहाँ लें.
          Homosexual Gay sex stories in Hindi, Gandu Chudai story.`,
    },
    {
        category_title: "Group Sex Stories",
        href: "group-sex-stories",
        description: `ग्रुप सेक्स की हिंदी कहानियाँ जिनमें तीन चार या ज्यादा लड़के लड़कियाँ मिल कर चुदाई करते हैं.
          Group sex stories with threesome, foursome and orgies in Hindi for free.`,
    },
    {
        category_title: "Indian Sex Stories",
        href: "indian-sex-stories",
        description: `sadfsadfsadf`,
    },
    {
        category_title: "Sali Sex",
        href: "sali-sex",
        description: `जीजा साली सेक्स की छेड़छाड़ व चूत चुदाई की हिन्दी कहानियाँ
          Jija Sali ki chut Chudai Hindi Sex story, Sali Ki choot Chudai Ki kahani
          Incest Sex Stories sis in law and brother in law`,
    },
    {
        category_title: "Teacher Sex",
        href: "teacher-sex",
        description: `टीचर के साथ सेक्स की कहानी, स्कूल कॉलेज या ट्यूशन टीचर के साथ चुदाई स्टोरी आप यहाँ पढ़ सकते हैं.
          school, college or tution teacher ki chudai ki kahani
          Sex With teacher`,
    },
    {
        category_title: "Teenage Girl",
        href: "teenage-girl",
        description: `19 साल की टीनएज लड़की की चुदाई की कहानी हिंदी में पढ़ कर मजा लें. कमसिन जवान लड़की की चूत में लंड कैसे घुसा? आप पढ़ना चाहेंगे ना?
          Teenage girl free sex story in Hindi for you only.
          अगर आप टीनेज़ गर्ल की सेक्स क्लिप देखना चाहते हैं तो यहाँ क्लिक करें.`,
    },
    {
        category_title: "XXX Kahani",
        href: "xxx-kahani",
        description: `XXX kahani Hindi mein, Desi Bhabhi, young Indian girl wild Sex story.
          क्सक्सक्स इन्डियन चुदाई कहानी, गर्म जवान लड़की, आंटी के साथ सेक्स स्टोरी हिंदी में पढ़ें और मजा लें.`,
    },
    {
        category_title: "अन्तर्वासना",
        href: "antarvasna",
        description: `असली अन्तर्वासना कामुकता से भरी हिंदी सेक्स कहानियाँ,
          Original Antarvasna Hindi sex stories for free
          यह अन्तर्वासना सेक्स स्टोरीज की नयी साईट है. अन्तर्वासना के खुलने में परेशानी के कारण इस नयी साईट को शुरू किया गया है.`,
    },
    {
        category_title: "हिंदी सेक्स स्टोरीज",
        href: "hindi-sex-stories",
        description: `Hindi Sex Stories of Desi Indian girl sex, bhabhi aunty Chut Chudai
          हिंदी सेक्स स्टोरी भाभी साली चाची की चूत चुदाई की, गांड चुदाई की कहानी
          इस साईट पर अन्तर्वासना की सभी हिंदी कहानियाँ एकदम मुफ्त में पढ़ें.`,
    },
];

function formatTag(input) {
    // Replace hyphens with spaces
    let replacedString = input.replaceAll('-', ' ');
    return replacedString;
}

const {
    freeSexkahaniStory_details,
} = require("../config/scrape/freeSexkahaniStory_details");

const {
    checkPicItemExists,
    savePicItem,
    PICITEMS_DB_COUNT,
    getPicItemByPage,
    checkPicExists,
    savePic,
    randomPiclist,
} = require("../db_query/PicsQuery");
const tagJSON = require("../JsonData/TagsDetail.json");
const { getTotalDocumentCountFunc, queryBuilder, getTotalDocumentCountFuncQuery, getRelatedVideos } = require('../Utils/desikahaniya.js');









router.post("/story_detailsAPI", async (req, res) => {
    const { story, story_Category } = req.body;
    let story_details = {};

    try {
        story_details = await checkStoryExists(story);
        if (story_details == null) {
            story_details = await freeSexkahaniStory_details(
                `https://www.freesexkahani.com/${story_Category}/${story}/`,
                story
            );
            await saveStory(story_details);
        }
    } catch (error) {
        // console.log(error);
        return res.status(200).json({ success: false, message: error });
    }

    return res.status(200).json({ success: true, data: story_details });
});


router.post("/downloadAudio", async (req, res) => {
    const { href, date } = req.body;

    try {
        await uploadAudioFile(href, date)
        return res.status(200).json({ success: true, });
    } catch (error) {
        return res.status(200).json({ success: false, message: "something wen wrong" });
    }

});


router.post("/HomepageStoriesUpdate", async (req, res) => {
    const { page } = req.body;

    let pagination_nav_pages = [];
    let finalDataArray_final = [];
    pagination_nav_pages.push(page);

    try {
        if (page === "1") {
            const { finalDataArray, categoryTitle, categoryDescription } =
                await freeSexkahani(`https://www.freesexkahani.com/page/1/`);
            finalDataArray.forEach(async (item) => {
                let obj = await checkStoryItemExists(item.Title);
                if (obj == null) {
                    await saveStoryItem(item);
                }
            });
        }

        let count = await DB_COUNT();

        let lastPage = Math.round(count / 12);
        pagination_nav_pages.push(lastPage.toString());

        finalDataArray_final = await getStoryItemByPage(page);

        return res.status(200).json({
            success: true,
            data: {
                count: count,
                finalDataArray: finalDataArray_final,
                pagination_nav_pages: pagination_nav_pages,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});


router.post("/getStoriesForUpdatingTitle", async (req, res) => {  //remove after use
    const { page } = req.body;

    let finalDataArray_final = [];
    try {
        finalDataArray_final = await getStoryItemforUpdatingTitle();
        return res.status(200).json({
            success: true,
            data: {
                finalDataArray: finalDataArray_final,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});


router.post("/updateNewStoryTitle", async (req, res) => {  //remove after use
    const { oldTitle, newTitle } = req.body;

    try {
        await updateDocumentTitle(oldTitle, newTitle);
        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});

router.post("/category", async (req, res) => {
    const { category, page } = req.body;
    let categoryTitle = "";
    let categoryDescription = "";
    categories.forEach((item) => {
        if (item.href === category) {
            categoryTitle = item.category_title;
            categoryTitle = item.category_title;
            categoryDescription = item.description;
        }
    });

    let pagination_nav_pages = [];
    let finalDataArray = [];

    pagination_nav_pages.push(page);

    try {
        let count = await DB_COUNT_CATEGORY({ category: categoryTitle });

        let lastPage = Math.round(count / 12);
        pagination_nav_pages.push(lastPage.toString());

        finalDataArray = await getStoryItemByPageCategory(categoryTitle, page);

        return res.status(200).json({
            success: true,
            data: {
                count: count,
                finalDataArray: finalDataArray,
                pagination_nav_pages: pagination_nav_pages,
                categoryTitle: categoryTitle,
                categoryDescription: categoryDescription,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});

router.post("/tag", async (req, res) => {
    const { tag, page } = req.body;
    let categoryTitle = "";
    let categoryDescription = "";
    tagJSON.forEach((item) => {
        if (item.href === tag) {
            categoryTitle = item.tag;
            categoryDescription = item.description;
        }
    });

    let pagination_nav_pages = [];
    let finalDataArray = [];

    pagination_nav_pages.push(page);

    try {
        const query = {
            "tags.name": categoryTitle,
        };
        let count = await DB_COUNT_TAGS(query);

        let lastPage = Math.round(count / 12);
        pagination_nav_pages.push(lastPage.toString());

        finalDataArray = await getStoryItemByPageTag(query, page);

        return res.status(200).json({
            success: true,
            data: {
                count: count,
                finalDataArray: finalDataArray,
                pagination_nav_pages: pagination_nav_pages,
                categoryTitle: categoryTitle,
                categoryDescription: categoryDescription,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});

router.post("/date", async (req, res) => {
    const { year, month, page } = req.body;

    var monthArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let categoryTitle =
        monthArray[parseInt(month.replace(/^0+/, "")) - 1] + "-" + year;
    let categoryDescription = "";

    let pagination_nav_pages = [];
    let finalDataArray = [];

    pagination_nav_pages.push(page);
    let count = await getStoryItemByDateCOUNT(month, year);
    let lastPage = Math.round(count / 12);
    pagination_nav_pages.push(lastPage.toString());

    try {
        finalDataArray = await getStoryItemByDate(month, year, page);

        return res.status(200).json({
            success: true,
            data: {
                finalDataArray: finalDataArray,
                categoryTitle: categoryTitle,
                categoryDescription: categoryDescription,
                pagination_nav_pages: pagination_nav_pages,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});

router.post("/author", async (req, res) => {
    const { author } = req.body;
    let categoryTitle =
        " " + author.replace("-", " ").replace("_", " ").toUpperCase();
    let categoryDescription = "";

    let finalDataArray = [];

    try {
        finalDataArray = await getStoryItemByAuthor(author);

        return res.status(200).json({
            success: true,
            data: {
                finalDataArray: finalDataArray,
                categoryTitle: categoryTitle,
                categoryDescription: categoryDescription,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});

router.get("/latestStories", async (req, res) => {
    var date = new Date();
    var currentMonth = date.getMonth() + 1;
    var currentYear = date.getFullYear();

    if (currentMonth < 10) {
        currentMonth = "0" + currentMonth.toString();
    } else {
        currentMonth = currentMonth.toString();
    }

    let finalDataArray = [];

    try {
        finalDataArray = await randomLatestStories(
            currentMonth,
            currentYear.toString()
        );
        return res
            .status(200)
            .json({ success: true, data: { finalDataArray: finalDataArray } });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});



router.post("/getHomepageVideos", async (req, res) => {


    const { page } = req.body;
    const pageNumber = parseInt(page);
    const pageSize = 60;
    const skip = (pageNumber - 1) * pageSize;

    try {
        const db = admin_DesiKahaniNextjs.firestore();

        let query = db.collection('Desi_Porn_Videos')
            .where('publish', '==', true)
            .orderBy('timestamp', 'desc')
            .offset(skip)
            .limit(pageSize);

        const snapshot = await query.get();


        const videos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));


        const totalDocuments = await getTotalDocumentCountFunc();
        const totalPages = Math.ceil(totalDocuments / pageSize);
        const pagination_nav_pages = ["1", totalPages.toString()]


        return res.status(200).json({ videos, pagination_nav_pages });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});

router.post("/getQueryVideos", async (req, res) => {


    const { page, sort, duration } = req.body;


    const pageNumber = parseInt(page);
    const pageSize = 60;

    try {

        const { paginatedQuery } = await queryBuilder({ sort, duration, pageNumber, pageSize });
        const snapshot = await paginatedQuery.get();

        const videos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));


        let totalDocuments = 0
        if (duration != "all") {
            totalDocuments = await getTotalDocumentCountFuncQuery(sort, duration)
        } else {
            totalDocuments = await getTotalDocumentCountFunc()
        }
        const totalPages = Math.ceil(totalDocuments / pageSize);
        const pagination_nav_pages = ["1", totalPages.toString()]

        return res.status(200).json({ videos, pagination_nav_pages });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});

router.post("/getTagVideos", async (req, res) => {

    const { tag, page } = req.body;
    const pageNumber = parseInt(page, 10);
    const pageSize = 60;
    const skip = (pageNumber - 1) * pageSize;

    try {
        const db = admin_DesiKahaniNextjs.firestore();
        const realtimeDb = admin_DesiKahaniNextjs.database(); // Initialize the Realtime Database



        let query = db.collection('Desi_Porn_Videos')
            .where('publish', '==', true)
            .where('tags', 'array-contains', formatTag(tag))
            .orderBy('timestamp', 'desc')
            .offset(skip)
            .limit(pageSize);


        const snapshot = await query.get();



        const videos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        async function getTotalDocumentCount(tag) {
            try {
                const snapshot = await realtimeDb.ref(`CategoriesVideoCount/${tag}`).once('value');
                const count = snapshot.val();
                return String(count)
            } catch (error) {
                console.error('Error fetching the field:', error);
            }
        }

        const totalDocuments = await getTotalDocumentCount(formatTag(tag));
        const totalPages = Math.ceil(totalDocuments / pageSize);
        const pagination_nav_pages = ["1", totalPages.toString()]


        return res.status(200).json({ videos, pagination_nav_pages });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});

router.post("/videoPageData", async (req, res) => {
    const { id } = req.body;


    const db = admin_DesiKahaniNextjs.firestore();


    async function getDocumentById(id) {
        try {
            const docRef = db.collection('Desi_Porn_Videos').doc(id);
            const doc = await docRef.get();

            if (!doc.exists) {
                throw new Error('Document not found');
            }

            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error fetching document:', error);
            throw error;
        }
    }

    try {

        let document = await getDocumentById(id);
        document.videoSrc = `https://pub-46cdeefeaf774247ab99232ab1ebaa66.r2.dev/DesiPornVideos/FullVideo/${document.id}.mp4`;
        const relatetdVideos = await getRelatedVideos(document.tags);

        return res.status(200).json({ video_details: document, relatetdVideos: relatetdVideos });

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }

});



async function updateDB() {
    const PicModel = require("../models/PicItemModel.js"); //homepage story item
    const PicExist = await PicModel.find();

    PicExist.forEach(async (obj, index) => {
        const { thumbnail, fullalbum_href } = obj;

        if (thumbnail.includes("https://storage.googleapis")) {
            return;
        }

        const file = bucket.file(
            `picsItemModel/${obj.fullalbum_href}/thumbnail.png`
        );
        const [exists] = await file.exists();
        if (!exists) {
            console.log(fullalbum_href);

            return;
        }

        // Get the download URL of the image file
        await file
            .getSignedUrl({
                action: "read",
                expires: "03-17-2025",
            })
            .then(async (url) => {
                console.log("Download URL:", url[0]);

                await PicModel.updateOne(
                    { fullalbum_href: fullalbum_href },
                    {
                        $set: {
                            thumbnail: url[0],
                        },
                    }
                );
            })
            .catch((error) => {
                console.error("Error getting download URL:", error);
            });
    });
}

// updateDB();




router.post("/publishStory", async (req, res) => {
    try {
        const storyExist = await checkPublishStoryExist(
            req.body.Title,
            req.body.email
        );
        if (storyExist == null) {
            await savePublishStory(req.body);
            return res
                .status(200)
                .json({ success: true, message: "Story sent for verification" });
        } else {
            return res
                .status(200)
                .json({ success: true, message: "Story with same title exists" });
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error });
    }
});




module.exports = router;
