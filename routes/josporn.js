const express = require('express');
const router = express.Router();

const { videolist_Scrape } = require("../config/jospornScrape/videolist_Scrape");
const { videopageDetails_Scrape } = require("../config/jospornScrape/videopageDetails_Scrape");
const { videolist_Scrape_search } = require("../config/jospornScrape/videolist_Scrape_search")

const {
  checkVideoDetailsExist_DB,
  saveVideoDetail,
  randomVideolist,
  getVideoItemByPage,
  checkVideoItemExist_DB,
  getVideoItemByCategory,
  VIDEOITEMS_DB_COUNT_CATEGORY,
  VIDEOITEMS_DB_COUNT,
} = require("../db_query/josporn_VideoQuery");




router.post("/jospornVideoPage", async (req, res) => {

  let title = req.body.title;
  const checkVideoItemExist = await checkVideoItemExist_DB(title);


  let href = checkVideoItemExist.href;

  var relatedVideos = await videolist_Scrape(href);
  var randomVideos = await randomVideolist();
  var suggestedVideoItems = [...relatedVideos, ...randomVideos];


  var videoDetailsObj = await checkVideoDetailsExist_DB(title);

  if (videoDetailsObj == null) {
    const obj = await videopageDetails_Scrape(href);
    if (obj != null) {
      obj.duration = checkVideoItemExist.duration;
      await saveVideoDetail(obj);


      res.status(200).json({
        videoDetailsObj: videoDetailsObj,
        suggestedVideoItems: suggestedVideoItems,
        success: true,
        screenshots: checkVideoItemExist.screenshots

      });
    } else {
      res.status(200).json({
        videoDetailsObj: videoDetailsObj,
        suggestedVideoItems: suggestedVideoItems,
        success: false,
        screenshots: checkVideoItemExist.screenshots

      });
    }
  } else {

    res.status(200).json({
      videoDetailsObj: videoDetailsObj,
      suggestedVideoItems: suggestedVideoItems,
      success: true,
      screenshots: checkVideoItemExist.screenshots
    });
  }
});


router.post("/jsoporn_videolist_category", async (req, res) => {
  let page = req.body.page;
  var category = req.body.category;



  var finalDataArray = await getVideoItemByCategory(page, category);

  var pagecount = await VIDEOITEMS_DB_COUNT_CATEGORY(category);




  if (finalDataArray.length == 0) {
    res.status(200).json({
      finalDataArray: finalDataArray,
      pages: pagecount,
      noVideos: true,
    });
  } else {
    res.status(200).json({
      finalDataArray: finalDataArray,
      pages: Math.round(pagecount / 40),
      noVideos: false,
    });
  }

});

router.post("/jsoporn_videolist_search", async (req, res) => {
  let key = req.body.key;
  let page = req.body.page;



  const { finalDataArray, lastpage } = await videolist_Scrape_search(`https://josporn.club/search/${key}/page-${page}/`);

  // var pagecount = await VIDEOITEMS_DB_COUNT_CATEGORY(category);

  if (finalDataArray.length == 0) {
    res.status(200).json({
      finalDataArray: finalDataArray,
      lastPage: lastpage,
      noVideos: true,
    });
  } else {
    res.status(200).json({
      finalDataArray: finalDataArray,
      lastPage: lastpage,
      noVideos: false,
    });
  }

});



router.post("/jsoporn_videolist", async (req, res) => {

  let page = req.body.page;

  var finalDataArray = await getVideoItemByPage(page);

  var pagecount = await VIDEOITEMS_DB_COUNT();

  if (finalDataArray.length == 0) {
    res.status(200).json({
      finalDataArray: finalDataArray,
      pages: pagecount,
      noVideos: true,
    });
  } else {
    res.status(200).json({
      finalDataArray: finalDataArray,
      pages: Math.round(pagecount / 40),
      noVideos: false,
    });
  }

});





module.exports = router;

