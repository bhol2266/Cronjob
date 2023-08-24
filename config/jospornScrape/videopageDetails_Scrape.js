const axios = require("axios");
const cheerio = require("cheerio");
const extractUrls = require("extract-urls");

async function videopageDetails_Scrape(url) {


  const response = await axios.get(url);
  const body = await response.data;
  const $$ = cheerio.load(body);

  let obj = null;
  var title = "";
  var duration = "";
  var like = "";
  var dislike = "";
  var src = {};
  var thumbnail = "";
  var description = "";
  var catergories = [];
  var number = "";

  title = $$("div.contentlist h1").text().trim();
  description = $$("div.story_description").first().text().trim();
  description = description
    .substring(0, description.indexOf("Categories:") - 11)
    .trim();
  like = $$("div.video_buttons a").first().text().trim();
  dislike = $$("div.video_buttons a").eq(1).text().trim();
  number = url.substring(url.indexOf("videos/") + 7, url.indexOf("-"));
  thumbnail = `https://josporn.club/uploads/${number}/thumb1.1.webp`;

  let array = extractUrls(body);
  array.forEach((url) => {
    if (url.includes(".mp4")) {
      src["720p"] = url.substring(0, url.length - 8) + "720p.mp4";
      src["480p"] = url.substring(0, url.length - 8) + "480p.mp4";
      src["360p"] = url.substring(0, url.length - 8) + "360p.mp4";
      src["240p"] = url.substring(0, url.length - 8) + "240p.mp4";
      return; // Exit the loop once a .mp4 URL is foun
    }
  });

  $$(".video_categories a").each((index, element) => {
    const category = $$(element).text().trim();
    catergories.push(category);
  });

  obj = {
    title: title,
    duration: duration,
    like: like,
    dislike: dislike,
    src: src,
    thumbnail: thumbnail,
    description: description,
    catergories: catergories,
    href: url,
  };
  return obj;
};



module.exports = { videopageDetails_Scrape };
