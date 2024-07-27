const axios = require('axios');
const cheerio = require('cheerio');

 const freeSexkahani = async (url) => {
  let finalDataArray = [];
  let categoryTitle = '';
  let categoryDescription = '';
  let pagination_nav_pages = [];

  const response = await axios.get(url);
  const html = response.data;
  const $$ = cheerio.load(html);

  $$('article').each((i, el) => {
    let Title = '';
    let author = {};
    let date = {};
    let completeDate = '';
    let views = '';
    let description = '';
    let href = '';
    let tags = [];
    let authorName = '';
    let authorHref = '';
    let category = '';

    const $ = cheerio.load(el);

    $('.entry-title a').each((i, el) => {
      Title = $(el).text();
      href = $(el).attr('href');
    });

    $('.cat-links a').each((i, el) => {
      category = $(el).text();
    });

    $('.author-name').each((i, el) => {
      authorName = $(el).text();
    });

    $('.url.fn.n').each((i, el) => {
      authorHref = $(el).attr('href');
    });

    author = {
      name: authorName,
      href: authorHref
        ? authorHref.substring(authorHref.indexOf('author/') + 7).replace(/\//g, '')
        : '',
    };

    $('.posted-on time').each((i, el) => {
      const data = $(el).text();
      date = {
        day: data.substring(0, 2),
        month: data.substring(3, 5),
        year: data.substring(6),
      };

      completeDate = parseInt(data.substring(6) + data.substring(3, 5) + data.substring(0, 2));
    });

    $('.post-views-eye').each((i, el) => {
      views = $(el).text();
    });

    $('.entry-content p:nth-child(1)').each((i, el) => {
      description = $(el).text();
    });

    $('.tags-links').each((i, el) => {
      const array = [];
      const select = cheerio.load(el);
      select('a').each((i, el) => {
        array.push({ name: $(el).text(), href: $(el).attr('href') });
      });
      tags = array;
    });

    finalDataArray.push({
      Title: Title,
      author: author,
      date: date,
      views: views,
      completeDate: completeDate,
      category: category,
      description: description || '',
      href: href,
      tags: tags,
    });
  });

  $$('.page-title').each((i, el) => {
    categoryTitle = $$(el).text();
  });

  $$('.taxonomy-description  p').each((i, el) => {
    const data = $$(el).text();
    categoryDescription = categoryDescription
      ? `${categoryDescription}\n\n\n${data}`
      : data;
  });

  $$('.nav-links').children().each((i, el) => {
    pagination_nav_pages.push($$(el).text());
  });

  return {
    finalDataArray: finalDataArray,
    categoryTitle: categoryTitle,
    categoryDescription: categoryDescription,
    pagination_nav_pages: pagination_nav_pages,
  };
};
module.exports = { freeSexkahani };
