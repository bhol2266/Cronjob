const cheerio = require('cheerio');
const axios = require('axios');



async function fullalbum(photoAlbum) {
    var imageArray = []


    const response = await axios.get(`https://hotdesipics.co/${photoAlbum}`)
    const body = await response.data;

    const $ = cheerio.load(body)

    $('.entry-content img').each(async (i, el) => {
        const links = $(el).attr("data-lazy-src")
        imageArray.push(links);

    })

    return {
        href: photoAlbum,
        imageArray: imageArray
    }
}


module.exports = { fullalbum };








