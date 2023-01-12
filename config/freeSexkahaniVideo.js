const cheerio = require('cheerio');
const fetchdata = require('node-fetch');









const freeSexkahaniVideo = async (url) => {

    var finalDataArray = []
    var categoryTitle = ''
    var categoryDescription = ''
    var pagination_nav_pages = []



    var TitleArray = []
    var thumbnailArray = []
    var dateArray = []
    var viewsArray = []
    var descriptionArray = []
    var hrefArray = []
    var tagsArray = []
    var authorArray = []

    const response = await fetchdata(url)
    const body = await response.text();
    const $ = cheerio.load(body)



 

    $('.entry-title a').each((i, el) => {

        const data = $(el).text()
        const href = $(el).attr("href")
        TitleArray.push(data)
        hrefArray.push(href)

 

    })

    $('.entry-content a img').each((i, el) => {

        const data = $(el).attr("src")
        thumbnailArray.push(data)
        console.log(data);
    })


    //Author name and link
    var authorName = []
    var authorHref = []
    $('.author-name').each((i, el) => {
        const data = $(el).text()
        authorName.push(data)

    })

    $('.url.fn.n').each((i, el) => {
        const data = $(el).attr('href')
        authorHref.push(data)
    })

    for (let index = 0; index < authorName.length; index++) {
        authorArray.push({ name: authorName[index], href: authorHref[index] })
    }



    $('.posted-on time').each((i, el) => {

        const data = $(el).text()
        dateArray.push(data)

    })


    $('.post-views-eye').each((i, el) => {

        const data = $(el).text()
        viewsArray.push(data)

    })
    $('.entry-content p:nth-child(1)').each((i, el) => {

        const data = $(el).text()
        descriptionArray.push(data)

    })
    $('.tags-links').each((i, el) => {

        var array = []

        const select = cheerio.load(el)
        select('a').each((i, el) => {
            const data = $(el).text()
            const href = $(el).attr('href')
            array.push({ name: data, href: href })

        })
        tagsArray.push(array)

    })

    $('.page-title').each((i, el) => {

        const data = $(el).text()
        categoryTitle = data

    })

    $('.taxonomy-description  p:nth-child(1)').each((i, el) => {

        const data = $(el).text()
        categoryDescription = data

    })


    $('.nav-links').children().each((i, el) => {

        const data = $(el).text()
        pagination_nav_pages.push(data)
    })




    for (let index = 0; index < TitleArray.length; index++) {

        finalDataArray.push({
            Title: TitleArray[index],
            thumbnail: thumbnailArray.length > 0 ? thumbnailArray[index] : "",
            author: authorArray.length > 0 ? authorArray[index] : "",
            date: dateArray.length > 0 ? dateArray[index] : "",
            views: viewsArray.length > 0 ? viewsArray[index] : "",
            description: descriptionArray[index] ? descriptionArray[index] : "",
            href: hrefArray[index],
            tags: tagsArray[index],

        })


    }


    return {
        finalDataArray: finalDataArray,
        categoryTitle: categoryTitle,
        categoryDescription: categoryDescription,
        pagination_nav_pages: pagination_nav_pages
    }

}
module.exports = { freeSexkahaniVideo };



