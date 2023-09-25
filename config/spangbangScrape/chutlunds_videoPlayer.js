const cheerio = require('cheerio');
const axios = require('axios');
const { scrapeVideos } = require('./spangbang');
const extractUrls = require('extract-urls');






var finalDataArray = {}
var preloaded_video_quality = ''
var relatedVideos = []
var pornstar = []
var videodetails = {}
var noVideos = false


const scrape = async (body) => {

    //Related Videos

    var thumbnailArray = []
    var TitleArray = []
    var durationArray = []
    var likedPercentArray = []
    var viewsArray = []
    var previewVideoArray = []
    var hrefArray = []

    const $ = cheerio.load(body)



    $('.right .video-item picture img').each((i, el) => {

        const data = $(el).attr("data-src")
        thumbnailArray.push(data)


    })
    $('.right .video-item picture img').each((i, el) => {

        const data = $(el).attr("alt")
        TitleArray.push(data)


    })
    $('.right .video-item .l').each((i, el) => {

        const data = $(el).text()
        durationArray.push(data)
    })



    $('.stats').each((i, el) => {

        const text = $(el).text()
        const likePercentage = text.substring(text.indexOf("%") - 4, text.indexOf("%") + 1)
        const views = text.substring(0, text.indexOf("%") - 4)

        likedPercentArray.push(likePercentage.trim())
        viewsArray.push(views.trim())
    })


    $('.right .video-item picture img').each((i, el) => {

        const data = $(el).attr("data-preview")
        previewVideoArray.push(data)
    })



    $('.right .video-item').each((i, el) => {

        const data = $(el).children().eq(1).attr("href")
        if (data) {
            hrefArray.push(`https://spankbang.com${data}`)
        }


    })



    for (let index = 0; index < thumbnailArray.length; index++) {

        if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cd.com")) {

            relatedVideos.push({
                thumbnailArray: thumbnailArray[index],
                TitleArray: TitleArray[index],
                durationArray: durationArray[index],
                likedPercentArray: likedPercentArray[index],
                viewsArray: viewsArray[index],
                previewVideoArray: previewVideoArray[index],
                hrefArray: hrefArray[index],

            })
        }
    }


}



const scrape2 = async (url) => {


    var default_video_src = ''
    var video_qualities_available_withURL = []
    var screenshotsArray = []
    var video_qualities_available = []

    var tagsArray = []
    var categoriesArray = []


    const response = await axios.get(url)
    const body = await response.data;
    const $ = cheerio.load(body)




    await scrape(body)

    $('video source').each((i, el) => {
        const data = $(el).attr("src")
        default_video_src = data
    })

    const cut1 = body.substring(body.indexOf('<main id="container">'), body.indexOf(`<main id="container">`) + 1000);
    const cut2 = cut1.substring(cut1.indexOf('var stream_data'), body.indexOf("mpd"));
    let video_qualities_url_array = extractUrls(cut2)


    //remove unwanted urls from "video_qualities_url_array"
    video_qualities_url_array = video_qualities_url_array.filter(url => {
        if (url.includes("https://vdownload")) {
            return url
        }
    })


    // Sometime the default_video_src is null in that case assinging second last url from "video_qualities_url_array"
    if (default_video_src.length < 5) {
        default_video_src = video_qualities_url_array[video_qualities_url_array.length - 2]
    }

    //Know which quality is set by default on spangbang website
    if (default_video_src.includes("240p.mp4")) {
        preloaded_video_quality = "240p"
    }
    if (default_video_src.includes("320p.mp4")) {
        preloaded_video_quality = "320p"
    }
    if (default_video_src.includes("480p.mp4")) {
        preloaded_video_quality = "480p"
    }
    if (default_video_src.includes("720p.mp4")) {
        preloaded_video_quality = "720p"
    }
    if (default_video_src.includes("1080p.mp4")) {
        preloaded_video_quality = "1080p"
    }
    if (default_video_src.includes("4k.mp4")) {
        preloaded_video_quality = "4k"
    }





    //Extract available video qualities
    for (let index = 0; index < video_qualities_url_array.length; index++) {
        if (video_qualities_url_array[index].includes("vdownload")) {

            if (video_qualities_url_array[index].includes("240p.mp4")) {
                video_qualities_available.push("240p")
            }
            if (video_qualities_url_array[index].includes("320p.mp4")) {
                video_qualities_available.push("320p")
            }
            if (video_qualities_url_array[index].includes("480p.mp4")) {
                video_qualities_available.push("480p")

            }
            if (video_qualities_url_array[index].includes("720p.mp4")
            ) {
                video_qualities_available.push("720p")

            }
            if (video_qualities_url_array[index].includes("1080p.mp4")) {
                video_qualities_available.push("1080p")

            }
            if (video_qualities_url_array[index].includes("4k.mp4")) {
                video_qualities_available.push("4k")

            }
        }

    }


    //This is just replacing quality query from default_video_src according to vailable qualities 
    for (let index = 0; index < video_qualities_available.length; index++) {
        video_qualities_available_withURL.push(default_video_src.replace(preloaded_video_quality, video_qualities_available[index]))
    }




    var sreenshots = []
    var seektime = []
    $('.timeline div span img').each((i, el) => {
        const data = $(el).attr("data-src")
        sreenshots.push(data)
    })
    $('.timeline div strong').each((i, el) => {
        const data = $(el).text()
        seektime.push(data)
    })

    for (let index = 0; index < sreenshots.length; index++) {
        screenshotsArray.push({ url: sreenshots[index], seekTime: seektime[index] })
    }


    $('.searches a').each((i, el) => {

        const data = $(el).text()
        tagsArray.push(data)
    })
    $('.cat .ent a').each((i, el) => {
        if ($(el).attr('href').includes('/pornstar/')) {
            const data = $(el).text()
            pornstar.push(data)
        }

    })


    // This is the data for video Details which was getting from localstorage previosly
    var Title = ''
    var duration = ''
    var likedPercent = ''
    var thumbnail = ''
    var views = ''
    $('.left h1').each((i, el) => {

        const data = $(el).text()
        Title = data
    })
    $('.i-length').each((i, el) => {

        const data = $(el).text()
        duration = data
    })
    $('.rate').each((i, el) => {

        const data = $(el).text()
        likedPercent = data
    })
    $('.play_cover img').each((i, el) => {

        const data = $(el).attr('src')
        thumbnail = data
    })
    $('.i-plays').each((i, el) => {

        const data = $(el).text()
        views = data.replaceAll("plays", "")
    })

    videodetails = {
        Title: Title,
        duration: duration,
        likedPercent: likedPercent,
        thumbnail: thumbnail,
        views: views,
    }

    finalDataArray = {
        default_video_src: default_video_src,
        video_qualities_available: video_qualities_available,
        video_qualities_available_withURL: video_qualities_available_withURL,
        screenshotsArray: screenshotsArray,
        tagsArray: tagsArray,
    }

}


exports.getVideoPageData = async (href) => {

    if (href.includes("https://spankbang.com/")) {
        href = href.replace("https://spankbang.com/", "https://spankbang.party/");
    }
    try {
        await scrape2(href)
    } catch (error) {
        console.log(error);
        noVideos = true;
        if (relatedVideos.length == 0) {  //sometimes the related videos not able to get scraped so trying again different way to scrap
            const obj = await scrapeVideos(href)
            relatedVideos = obj.finalDataArray;
        }
    }
    const returnObj = {
        videolink_qualities_screenshots: finalDataArray,
        preloaded_video_quality: preloaded_video_quality,
        relatedVideos: relatedVideos.length > 100 ? relatedVideos.slice(0, 100) : relatedVideos,
        pornstar: pornstar,
        video_details: videodetails,
        noVideos: noVideos,
    }
    return returnObj;

}

