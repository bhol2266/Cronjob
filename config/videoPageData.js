const cheerio = require('cheerio');
const axios = require('axios');





const videoPageData = async (url) => {
    
    var story_details = {}
   
   
    var Title = ''
    var videoLink = ''
    var description = ''
    var thumbnail = ''
    var category = {}
    var tagsArray = []


    const response = await axios.get(url)
    const body = await response.data;
    const $ = cheerio.load(body)

    // fs.writeFileSync(`Home.html`, body);




    $('.inside-article h1').each((i, el) => {

        const data = $(el).text()
        Title = data

    })

    $('video source').each((i, el) => {

        const data = $(el).attr("src")
        videoLink = data


    })
    $('video').each((i, el) => {

        const data = $(el).attr("poster")
        thumbnail = data


    })


    $('.inside-article p').first().each((i, el) => {
        const data = $(el).text()
        description = data

    })


    $('.cat-links a').each((i, el) => {
        const href = $(el).attr('href')
        const data = $(el).text()
        if (!data.includes('protected'))


            category = {
                title: data,
                href: href.substring(href.indexOf("category/") + 9, href.length).replace("/", "").replace("/", "").replace("/", "")
            }
    })

    $('.tags-links').each((i, el) => {

        const select = cheerio.load(el)
        select('a').each((i, el) => {
            const data = $(el).text()
            tagsArray.push(data)
        })

    })




    story_details = {
        Title: Title,
        thumbnail:thumbnail,
        videoLink: videoLink,
        description: description,
        category: category,
        tagsArray: tagsArray,
    }


    return story_details
}

module.exports = { videoPageData };




