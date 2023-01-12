const express = require('express')
const app = express()
const cron = require("node-cron");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const fs = require('fs')
const cheerio = require('cheerio');
const fetchdata = require('node-fetch');
const { freeSexkahani } = require('./config/freeSexkahani');
const { checkStoryExists, saveStory, checkStoryItemExists, saveStoryItem, DB_COUNT, getStoryItemByPage } = require('./db_query/story_detailsQuery')


// const schedule = require('node-schedule');
const axios = require('axios');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    () => {
        console.log("Mongoose Is Connected");
    }
);

// Middleware

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));




// Creating a cron job which runs on every 2days
// try {
//     cron.schedule("* * * */2 * *", function () {
//         console.log(Date.now, "Cronjob Executed");
//         const chutlundslive_DeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_35llC1epMrjIFZMX7ympxwUXzF7P/5wF67DyvB2'
//         const desiKahani_DeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_B3rQ4A5oZTfQvkLzIKw5l5QubA6m/TedDS2ajn7'
//         const chutlundscom_DeployHook = 'https://api.vercel.com/v1/integrations/deploy/prj_Ug2Ps3DBCILSKTXGxJwrPWQgHuYF/6FDww8cuPV'

//         axios.get(chutlundslive_DeployHook)
//         axios.get(desiKahani_DeployHook)
//         axios.get(chutlundscom_DeployHook)
//     });
// } catch (error) {

// }


// async function insertStoryThumbnail() {


//     for (let index = 1; index < 303; index++) {
//         let rawdata = fs.readFileSync(`./JsonData/homepage/${index}.json`);
//         let data = JSON.parse(rawdata);

//         const { finalDataArray } = data
//         finalDataArray.forEach(async(item) => {

//             const year=item.date.substring(6,item.date.length)
//             const month=item.date.substring(3,5)
//             const day=item.date.substring(0,2)
//             const completeDate=parseInt(year+month+day)
//             console.log(completeDate);

//             const parceldata= {
//                 Title:item.Title,
//                 author:item.author,
//                 date:completeDate,
//                 views:item.views,
//                 description:item.description,
//                 href:item.href,
//                 tags:item.tags,
//             }



//             await saveStoryItem(parceldata)


//         })
//     }


// }

//  insertStoryThumbnail()





app.post('/story_detailsAPI', async (req, res) => {

    const { story, story_Category } = req.body
    let story_details = {}

    const scrape = async (url) => {

        var Title = ''
        var author = {}
        var date = ''
        var views = ''
        var description = []
        var audiolink = ''
        var storiesLink_insideParagrapgh = []
        var relatedStoriesLinks = []
        var category = {}
        var tagsArray = []


        const response = await fetchdata(url)
        const body = await response.text();
        const $ = cheerio.load(body)





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
            views: views,
            description: description,
            audiolink: audiolink != null ? audiolink : '',
            storiesLink_insideParagrapgh: storiesLink_insideParagrapgh,
            category: category,
            tagsArray: tagsArray,
            relatedStoriesLinks: relatedStoriesLinks
        }

    }


    try {

        story_details = await checkStoryExists(story)
        if (story_details == null) {
            story_details = await scrape(`https://www.freesexkahani.com/${story_Category}/${story}/`)
            await saveStory(story_details)
        }
    } catch (error) {
        // console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


    return res.status(200).json({ success: true, data: story_details })
})




app.post('/HomepageStoriesUpdate', async (req, res) => {

    const { page } = req.body

    let pagination_nav_pages = []
    let finalDataArray_final = []
    pagination_nav_pages.push(page)

    try {
        if (page === "1") {
            const { finalDataArray, categoryTitle, categoryDescription, } = await freeSexkahani(`https://www.freesexkahani.com/page/1/`)
            finalDataArray.forEach(async (item) => {
                let obj = await checkStoryItemExists(item.Title)
                if (obj == null) {

                    const year = item.date.substring(6, item.date.length)
                    const month = item.date.substring(3, 5)
                    const day = item.date.substring(0, 2)
                    const completeDate = parseInt(year + month + day)

                    const parceldata = {
                        Title: item.Title,
                        author: item.author,
                        date: completeDate,
                        views: item.views,
                        description: item.description,
                        href: item.href,
                        tags: item.tags,
                    }
                    await saveStoryItem(parceldata)
                }
            })
        }


        let count = await DB_COUNT()

        let lastPage = Math.round(count / 12)
        pagination_nav_pages.push(lastPage.toString())


        finalDataArray_final = await getStoryItemByPage(page)

        return res.status(200).json({ success: true, data: { count: count, finalDataArray: finalDataArray_final, pagination_nav_pages: pagination_nav_pages } })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ success: false, message: error })

    }


})










app.listen(port, () => {
    console.log(`App running on port ${port}`)
})



