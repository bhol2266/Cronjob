const cheerio = require('cheerio');

exports.freeSexkahani = async (url) => {


  var finalDataArray = []
  var categoryTitle = ''
  var categoryDescription = ''
  var pagination_nav_pages = []


  const response = await fetch(url)
  const html = await response.text();
  const $$ = cheerio.load(html);



  $$('article').each((i, el) => {


    var Title = ""
    var author = {}
    var date = {}
    var completeDate = ''
    var views = ""
    var description = ""
    var href = ""
    var tags = []
    var authorName = ""
    var authorHref = ""
    var category = ""

    const $ = cheerio.load(el)

    $('.entry-title a').each((i, el) => {

      Title = $(el).text()
      href = $(el).attr("href")

    })
    $('.cat-links a').each((i, el) => {

      category = $(el).text()

    })

    //Author name and link

    $('.author-name').each((i, el) => {
      const data = $(el).text()
      authorName = data

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
        array.push({ name: data, href: href })

      })
      tags = array

    })




    finalDataArray.push({
      Title: Title,
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

  $$('.taxonomy-description  p').each((i, el) => {
    const data = $$(el).text()
    if (categoryDescription.length === 0) {
      categoryDescription = data
    } else {
      categoryDescription = categoryDescription + "\n" + "\n" + "\n" + data
    }
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
