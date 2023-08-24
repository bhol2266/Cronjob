const axios = require("axios");
const cheerio = require("cheerio");
const extractUrls = require("extract-urls");


exports.videolist_Scrape=async(url)=> {

  const response = await axios.get(url);
  const body = await response.data;
  const $$ = cheerio.load(body);

  var finalDataArray = [];

  $$(".contentlist #preview").each((i, el) => {
    var title = "";
    var duration = "";
    var views = "";
    var likePercent = "";
    var href = "";
    var thumbnail = "";
    var screenshots = [];
    var number = "";
    const $ = cheerio.load(el);

    title = $("div.preview_title a").text().trim();
    duration = $("span.duration").text().trim();
    likePercent = $("span.likes").text().trim();
    views = $("span.views").text().trim();
    href = $("div.preview_title a").attr("href");
    thumbnail = $("div.preview_screen a img").attr("src");

    if (typeof href != "undefined") {
      for (let index = 1; index < 12; index++) {
        number = href.substring(href.indexOf("videos/") + 7, href.indexOf("-"));
        const imageUrl = `https://josporn.club/uploads/${number}/thumb${index}.jpg`;
        screenshots.push(imageUrl);
      }

      const obj = {
        title: title,
        duration: duration,
        views: views,
        likePercent: likePercent,
        thumbnail: thumbnail,
        screenshots: screenshots,
        href: href,
        number: number,
      };
      finalDataArray.push(obj);
    }
  });

  return finalDataArray;
}
