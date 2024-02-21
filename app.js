const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { checkforLatestStories } = require('./config/DesiKahani_FirestoreUtils.js');
const { showAppsNotification } = require('./config/AppNotifications');
const { runDeployhooks } = require('./config/DeployHook');
const desiKahaniyaRoutes = require('./routes/desikahaniya.js');
const codeoutRoutes = require('./routes/codeouts.js');
const jospornRoutes = require('./routes/josporn.js');
const chutlundsRoutes = require('./routes/chutlunds.js');
const desiKahaniya_dbConnect = require('./config/desiKahaniya_dbConnect');
const josporn_dbConnect = require('./config/josporn_dbConnect');
const { getVideoPageData } = require("./config/spangbangScrape/chutlunds_videoPlayer")
const { getHomePageVideos } = require("./config/spangbangScrape/getHomepageVideos.js")
const { Translate } = require('@google-cloud/translate').v2;
const { freeSexkahaniStory_details, } = require("./config/scrape/freeSexkahaniStory_details.js");
const {
  checkStoryExists,
  saveStory,
  checkStoryItemExists,
  getStoryItems_forApp,
} = require("./db_query/story_detailsQuery");

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}





app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cors());

// Routes
app.use('/desikahaniya', desiKahaniyaRoutes);
app.use('/codeouts', codeoutRoutes);
app.use('/josporn', jospornRoutes);
app.use('/chutlunds', chutlundsRoutes);


//Deso Kahani Mobile App APIs
app.post("/updateStories_inDB", async (req, res) => {
  const { completeDate } = req.body;
  console.log(completeDate);

  try {
    const storyItemsArray = await getStoryItems_forApp(parseInt(completeDate));
    console.log(storyItemsArray.length);
    if (storyItemsArray.length == null) {
      return res.status(200).json({ success: false, message: "no stories" });
    } else {
      return res.status(200).json({
        success: true,
        data: storyItemsArray,
        message: "All story Items",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({ success: false, message: error });
  }
});

app.post("/storiesDetails", async (req, res) => {
  const { href } = req.body;
  const story_details = await checkStoryExists(href);
  return res
    .status(200)
    .json({ success: true, data: story_details, message: href });
});


app.post("/storiesDetailsByTitle", async (req, res) => {
  const { Title } = req.body;
  const story_details = await checkStoryItemExists(Title);
  if (story_details !== null) {
    const { href } = story_details;

    const rough = href.substring(href.indexOf(".com/") + 5, href.length - 1);
    const category = rough.substring(0, rough.indexOf("/"));
    const story_href = rough.substring(rough.indexOf("/") + 1, rough.length);

    let newStoryDetails = await checkStoryExists(story_href);
    if (newStoryDetails == null) {
      newStoryDetails = await freeSexkahaniStory_details(
        `https://www.freesexkahani.com/${category}/${story_href}/`,
        story_href
      );
      await saveStory(newStoryDetails);
    }
    return res
      .status(200)
      .json({ success: true, data: newStoryDetails, message: Title });
  } else {
    return res.status(200).json({ success: false, message: Title });
  }
});

app.post("/getHomePageVideos", async (req, res) => {
  const { href } = req.body;


  try {
    const { finalDataArray_Arrar } = await getHomePageVideos(href);

    return res
      .status(200)
      .json({ success: true, finalDataArray: finalDataArray_Arrar });
  } catch (error) {
    serverError = true
    return res
      .status(200)
      .json({ success: false });
  }

});


const keyFilename = "./config/google_cloud_sk.json"
const projectId = 'node-js-399016';
const translate = new Translate({ projectId, keyFilename });

app.post("/languageTranslate", async (req, res) => {
  const { text, langCode } = req.body;
  var translatedext = null;

  async function translateText(text, targetLanguage) {
    try {
      const [translation] = await translate.translate(text, targetLanguage);
      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);
      translatedext = translation
    } catch (error) {
      console.error('Translation error:', error);
    }
  }

  // Usage example
  const textToTranslate = text;
  const targetLanguage = langCode; // French

  await translateText(textToTranslate, targetLanguage);

  // return res.status(200).json({ success: false, message: Title });

  return res
    .status(200)
    .json({ success: true, langCode: langCode, translatedext: translatedext });
});




// Start server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Set up cron jobs
showAppsNotification();
runDeployhooks();
checkforLatestStories();
