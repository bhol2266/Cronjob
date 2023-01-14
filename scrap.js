const axios = require('axios');
const cheerio = require('cheerio');

const freeSexkahani = async (url) => {


  var finalDataArray = []
  var categoryTitle = ''
  var categoryDescription = ''
  var pagination_nav_pages = []


  const response = await axios.get(url)
  const body = await response.data;
  const $$ = cheerio.load(body)



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

    author = { name: authorName, href: authorHref.substring(authorHref.indexOf("author/") + 7, authorHref.length).replaceAll("/", "") }



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

      console.log(date, completeDate);
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










for (let index = 1; index <= 302; index++) {
  let data = await freeSexkahani(`https://www.freesexkahani.com/page/${index}/`)
  console.log(`PAGE-${index} COMPLETED!`);
  console.log(data);
  // fs.writeFileSync(`JsonData/stories/homepage/${index}.json`, JSON.stringify(data));
}


// var paths = []

// for (let index = 1; index <= 50; index++) {
//   paths.push({ params: { page: index.toString() } })
// }

// console.log(paths);




