const cheerio = require('cheerio');
const axios = require('axios');
const extractUrls = require("extract-urls");



const hotdesipics = async (url, index) => {


    const response = await axios.get(url)
    const body = await response.data;
    const $$ = cheerio.load(body)
    var finalDataArray = []




    $$('.masonry article').each((i, el) => {
        var Title = ''
        var thumbnail = ''
        var completeDate = null
        var date = {}
        var fullalbum_href = ''
        var errorImage = false

        const $ = cheerio.load(el)



        $('.entry-thumbnail img').each((i, el) => {

            try {
                var data = $(el).attr("data-lazy-srcset")
                let links = extractUrls(data)
                thumbnail = links[0]

            } catch (error) {

                errorImage = true
            }
        })


        $('.entry-title a').each((i, el) => {

            Title = $(el).text().trim();
        })

        $('.entry-date').each((i, el) => {

            var monthArray = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

            var rawDate = $(el).text().trim().replace("th", "")
            var day = rawDate.substring(0, rawDate.indexOf(" "))
            if (parseInt(day) < 10) {
                day = "0" + day
            }
            var monthName = rawDate.substring(rawDate.indexOf(" "), rawDate.length - 4).trim()
            var month = ''
            monthArray.forEach((item, index) => {
                if (item.toLowerCase() === monthName.toLowerCase()) {
                    month = index + 1
                    month = month.toString()
                }
            })
            if (parseInt(month) < 10) {
                month = "0" + month
            }

            var year = rawDate.substring(rawDate.length - 4, rawDate.length).trim()

            date = {
                day: day,
                month: month,
                year: year,
            }

            completeDate = parseInt(year + month + day)

        })
        $('.entry-thumbnail').each((i, el) => {

            var data = $(el).attr('href')

            fullalbum_href = data.substring(data.indexOf("pics.co/") + 8, data.length).replace("/", "").replace("/", "")

        })
        if (!errorImage) {
            finalDataArray.push({ Title: Title, thumbnail: thumbnail, date: date, completeDate: completeDate, fullalbum_href: fullalbum_href })
        }

    }

    )
    return finalDataArray

}


module.exports = { hotdesipics };








