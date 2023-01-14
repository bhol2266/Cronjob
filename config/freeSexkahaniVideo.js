const cheerio = require('cheerio');
const axios = require('axios');








const freeSexkahaniVideo = async (url) => {

    var finalDataArray = []
    var categoryTitle = ''
    var categoryDescription = ''
    var pagination_nav_pages = []


    const response = await axios.get(url)
    const body = await response.data;
    const $$ = cheerio.load(body)



    $$('article').each((i, el) => {

        var Title = ""
        var thumbnail = ""
        var date = {}
        var author = {}
        var completeDate = ''
        var views = ""
        var description = ""
        var href = ""
        var tags = []
        var category = {}

        const $ = cheerio.load(el)




        $('.entry-title a').each((i, el) => {

            Title = $(el).text()
            href = $(el).attr("href")

        })

        $('.cat-links a').each((i, el) => {

            var category_name = $(el).text()
            var category_href = $(el).attr("href")
            category = { name: category_name, href: category_href.substring(category_href.indexOf("category/") + 9, category_href.length).replace("/", "").replace("/", "").replace("/", "") }

        })

        $('.entry-content a img').each((i, el) => {
            thumbnail = $(el).attr("src")
        })


        var authorName = ""
        var authorHref = ""
        $('.author-name').each((i, el) => {
            authorName = $(el).text()

        })

        $('.url.fn.n').each((i, el) => {
            const data = $(el).attr('href')
            authorHref = data
        })
        author = { name: authorName, href: authorHref.substring(authorHref.indexOf("author/") + 7, authorHref.length).replace("/", "").replace("/", "").replace("/", "") }



        $('.posted-on time').each((i, el) => {
            const data = $(el).text()
            date = {
                day: data.substring(0, 2),
                month: data.substring(3, 5),
                year: data.substring(6, data.length),
            }

            const year = data.substring(6, data.length)
            const month = data.substring(3, 5)
            const day = data.substring(0, 2)
            completeDate = parseInt(year + month + day)

        })


        $('.post-views-eye').each((i, el) => {

            const data = $(el).text()
            views = data

        })
        $('.entry-content p:nth-child(1)').each((i, el) => {

            const data = $(el).text()
            description = data

        })
        $('.tags-links').each((i, el) => {

            var array = []

            const select = cheerio.load(el)
            select('a').each((i, el) => {
                const data = $(el).text()
                const href = $(el).attr('href')
                array.push({ name: data,href: href.substring(href.indexOf("tag/") + 4, href.length).replace("/", "").replace("/", "").replace("/", "") })

            })
            tags = array

        })



        finalDataArray.push({
            Title: Title,
            thumbnail: thumbnail,
            author: author,
            date: date,
            views: views,
            completeDate: completeDate,
            category: category,
            description: description ? description : "",
            href: href,
            tags: tags,

        })


    })


    $$('.page-title').each((i, el) => {

        const data = $$(el).text()
        categoryTitle = data

    })

    $$('.taxonomy-description  p:nth-child(1)').each((i, el) => {

        const data = $$(el).text()
        categoryDescription = data

    })


    $$('.nav-links').children().each((i, el) => {

        const data = $$(el).text()
        pagination_nav_pages.push(data)
    })




    return {
        finalDataArray: finalDataArray,
        categoryTitle: categoryTitle,
        categoryDescription: categoryDescription,
        pagination_nav_pages: pagination_nav_pages
    }

}
module.exports = { freeSexkahaniVideo };



