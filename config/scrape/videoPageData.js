const axios = require('axios');
const cheerio = require('cheerio');

 const videoPageData = async (url, href) => {
    let story_details = {};
    let Title = '';
    let videoLink = '';
    let description = '';
    let thumbnail = '';
    let category = {};
    let tagsArray = [];

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    $('.inside-article h1').each((i, el) => {
        Title = $(el).text();
    });

    $('video source').each((i, el) => {
        videoLink = $(el).attr('src');
    });

    $('video').each((i, el) => {
        thumbnail = $(el).attr('poster');
    });

    $('.inside-article p').first().each((i, el) => {
        description = $(el).text();
    });

    $('.cat-links a').each((i, el) => {
        const href = $(el).attr('href');
        const data = $(el).text();
        if (!data.includes('protected')) {
            category = {
                title: data,
                href: href.substring(href.indexOf('category/') + 9).replace(/\//g, ''),
            };
        }
    });

    $('.tags-links').each((i, el) => {
        const select = cheerio.load(el);
        select('a').each((i, el) => {
            tagsArray.push($(el).text());
        });
    });

    story_details = {
        Title: Title,
        thumbnail: thumbnail,
        href: href,
        videoLink: videoLink,
        description: description,
        category: category,
        tagsArray: tagsArray,
    };

    return story_details;
};
module.exports = { videoPageData };
