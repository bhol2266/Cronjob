const cheerio = require('cheerio');

exports.freeSexkahaniStory_details = async (url, story) => {

    var Title = ''
    var author = {}
    var date = ''
    var completeDate = null
    var views = ''
    var description = []
    var audiolink = ''
    var storiesLink_insideParagrapgh = []
    var relatedStoriesLinks = []
    var category = {}
    var tagsArray = []


    const response = await fetch(url)
    const html = await response.text();
    const $ = cheerio.load(html);
  


    $('.entry-title').each((i, el) => {

        const data = $(el).text()
        Title = data

    })
    //Author name and link

    $('.author-name').each((i, el) => {
        const authorName = $(el).text()

        $('.url.fn.n').each((i, el) => {
            const authorHref = $(el).attr('href')
            author = { name: authorName, href: authorHref }
        })

    })






    $('.posted-on time').each((i, el) => {

        const data = $(el).text()
        date = data
        const year = data.substring(6, data.length)
        const month = data.substring(3, 5)
        const day = data.substring(0, 2)
        completeDate = parseInt(year + month + day)


    })


    $('.post-views-eye').each((i, el) => {

        const data = $(el).text()
        views = data
    })

    $('.entry-content p').each((i, el) => {
        const data = $(el).text()
        description.push(data)

    })

    $('.entry-content p a').each((i, el) => {
        const href = $(el).attr('href')
        const data = $(el).text()
        if (!data.includes('protected'))
            storiesLink_insideParagrapgh.push({
                title: data,
                href: href
            })
    })

    $('.prev a').each((i, el) => {
        const href = $(el).attr('href')
        const data = $(el).text()
        if (!data.includes('protected'))
            storiesLink_insideParagrapgh.push({
                title: data,
                href: href
            })
    })
    $('.next a').each((i, el) => {
        const href = $(el).attr('href')
        const data = $(el).text()
        if (!data.includes('protected'))
            storiesLink_insideParagrapgh.push({
                title: data,
                href: href
            })
    })
    $('.cat-links a').each((i, el) => {
        const href = $(el).attr('href')
        const data = $(el).text()
        if (!data.includes('protected'))
            category = {
                title: data,
                href: href
            }
    })
    $('ol li a').each((i, el) => {
        const href = $(el).attr('href')
        const data = $(el).text()
        relatedStoriesLinks.push({
            title: data,
            href: href
        })
    })

    $('.tags-links').each((i, el) => {

        const select = cheerio.load(el)
        select('a').each((i, el) => {
            const data = $(el).text()
            tagsArray.push(data)
        })

    })

    $('.wp-audio-shortcode source').each((i, el) => {
        const data = $(el).attr('src')
        audiolink = data

    })


    return story_details = {
        Title: Title,
        href: story,
        author: author,
        date: date,
        completeDate: completeDate,
        views: views,
        description: description,
        audiolink: audiolink != null ? audiolink : '',
        storiesLink_insideParagrapgh: storiesLink_insideParagrapgh,
        category: category,
        tagsArray: tagsArray,
        relatedStoriesLinks: relatedStoriesLinks
    }

}


