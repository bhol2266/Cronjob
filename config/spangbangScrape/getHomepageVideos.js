const cheerio = require('cheerio');
const axios = require('axios');

let finalDataArray_Arrar = [];

exports.getHomePageVideos = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('.videos .video-list.video-rotate').each((i, el) => {
            const select = cheerio.load(el);

            const thumbnails = select('.video-item picture img').map((i, el) => $(el).attr('data-src')).get();
            const titles = select('.video-item picture img').map((i, el) => $(el).attr('alt')).get();
            const durations = select('.video-item .l').map((i, el) => $(el).text()).get();
            const previews = select('.video-item picture img').map((i, el) => $(el).attr('data-preview')).get();
            const hrefs = select('.video-item a').map((i, el) => `https://spankbang.com${$(el).attr('href')}`).get();
            const stats = select('.video-item .stats').map((i, el) => {
                const text = $(el).text();
                const likePercentage = text.substring(text.indexOf("%") - 4, text.indexOf("%") + 1).trim();
                const views = text.substring(0, text.indexOf("%") - 4).trim();
                return { likePercentage, views };
            }).get();

            const filteredData = thumbnails.map((thumbnail, index) => ({
                thumbnail,
                title: titles[index],
                duration: durations[index],
                likedPercent: stats[index]?.likePercentage,
                views: stats[index]?.views,
                preview: previews[index],
                href: hrefs[index],
            })).filter(item => item.href && item.preview && !item.thumbnail.includes("//assets.sb-cdate.com"));

            if (filteredData.length > 2) {
                finalDataArray_Arrar.push(filteredData);
            }
        });

        return { finalDataArray_Arrar };
    } catch (error) {
        console.error("Error fetching the page:", error);
        return { finalDataArray_Arrar: [] };
    }
};
