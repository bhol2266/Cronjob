const cheerio = require('cheerio');
const axios = require('axios');


var finalDataArray_Arrar = []


exports.getHomePageVideos = async (url) => {

    var finalDataArray = []
    var thumbnailArray = []
    var TitleArray = []
    var durationArray = []
    var likedPercentArray = []
    var viewsArray = []
    var previewVideoArray = []
    var hrefArray = []

    const response = await axios.get(url)
    const body = await response.data;
    const $ = cheerio.load(body)





    $('.videos .video-list.video-rotate').each((i, el) => {

      const select = cheerio.load(el)

      select('.video-item picture img').each((i, el) => {

        const data = $(el).attr("data-src")
        thumbnailArray.push(data)


      })

      select('.video-item picture img').each((i, el) => {

        const data = $(el).attr("alt")
        TitleArray.push(data)


      })

      select('.video-item .l').each((i, el) => {

        const data = $(el).text()
        durationArray.push(data)
      })



      select('.video-item .stats').each((i, el) => {

        const text = $(el).text()
        const likePercentage = text.substring(text.indexOf("%") - 4, text.indexOf("%") + 1)
        const views = text.substring(0, text.indexOf("%") - 4)

        likedPercentArray.push(likePercentage.trim())
        viewsArray.push(views.trim())

      })


      select('.video-item picture img').each((i, el) => {

        const data = $(el).attr("data-preview")
        previewVideoArray.push(data)
      })



      select('.video-item').each((i, el) => {

        const data = $(el).children().eq(1).attr("href")
        if (data) {
          hrefArray.push(`https://spankbang.com${data}`)
        }
      })



      for (let index = 0; index < thumbnailArray.length; index++) {

        if (hrefArray[index] != undefined && previewVideoArray[index] != undefined && !thumbnailArray[index].includes("//assets.sb-cdate.com")) {

          finalDataArray.push({
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

      if (finalDataArray.length > 2) {
        finalDataArray_Arrar.push(finalDataArray)
      }

      thumbnailArray = []
      TitleArray = []
      durationArray = []
      likedPercentArray = []
      viewsArray = []
      previewVideoArray = []
      hrefArray = []

      finalDataArray = []
    })


    return { finalDataArray_Arrar: finalDataArray_Arrar }
}


