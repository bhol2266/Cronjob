const axios = require('axios');
const cheerio = require('cheerio');

 const sidebarStories = async (url) => {
    let finalDataArray = [];
    let finalDataArray2 = [];

    // This is for recent stories
    let TitleArray = [];
    let hrefArray = [];

    // This is for stories by date
    let TitleArray2 = [];
    let hrefArray2 = [];

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    $('#recent-posts-2 ul li a').each((i, el) => {
        const title = $(el).text();
        const href = $(el).attr('href');
        TitleArray.push(title);
        hrefArray.push(href);
    });

    $('#archives-3 ul li a').each((i, el) => {
        const title = $(el).text();
        const href = $(el).attr('href');
        TitleArray2.push(title);
        hrefArray2.push(href);
    });

    for (let index = 0; index < TitleArray.length; index++) {
        finalDataArray.push({
            name: TitleArray[index],
            href: hrefArray[index],
        });
    }

    for (let index = 0; index < TitleArray2.length; index++) {
        finalDataArray2.push({
            name: TitleArray2[index],
            href: hrefArray2[index],
        });
    }

    return {
        sidebarStoriesData: finalDataArray,
        sidebarStoriesBydate: finalDataArray2,
    };
};
module.exports = { sidebarStories };
