const cheerio = require('cheerio');
const axios = require('axios');

let finalDataArray_Arrar = [];

exports.getHomePageVideos = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        $('.video-rotate').each((i, ele) => {
            const select = cheerio.load(ele);

            let finalDataArray = [];

            select('.video-item').each((i, el) => {
        
                const thumbnail = select(el).find('picture img').attr('data-src');
                const title = select(el).find('picture img').attr('alt');
                const duration = select(el).find('.l').text();
        
                const statsText = select(el).find('.stats').text();
                const likePercentage = statsText.substring(statsText.indexOf("%") - 4, statsText.indexOf("%") + 1).trim();
                const views = statsText.substring(0, statsText.indexOf("%") - 4).trim();
        
                const previewVideo = select(el).find('picture img').attr('data-preview');
                const href = `https://spankbang.com${$(el).find('a').attr('href')}`;
        
                if (href !== undefined && previewVideo !== undefined && !thumbnail.includes("//assets.sb-cd.com")) {
                    finalDataArray.push({
                        thumbnail: thumbnail,
                        title: title,
                        duration: duration,
                        likePercentage: likePercentage,
                        views: views,
                        previewVideo: previewVideo,
                        href: href,
                    });
                }
            });
            if (finalDataArray.length > 2) {
                finalDataArray_Arrar.push(finalDataArray);
            }
            finalDataArray = [];
        });

        return { finalDataArray_Arrar };
    } catch (error) {
        console.error("Error fetching the page:", error);
        return { finalDataArray_Arrar: [] };
    }
};
  