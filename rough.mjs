import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs/promises'; // Use the promise-based API of the 'fs' module

const url = 'https://www.antarvasnaphotos.com/page/1';

async function scrapePage() {
  try {
    // Fetch the HTML from the URL
    const response = await fetch(url);

    // Convert the response to text
    const html = await response.text();

    // Save the HTML to a local file
    await fs.writeFile('home.html', html);
    console.log('HTML content saved to home.html');


  } catch (error) {
    console.error('Error scraping the page:', error);
  }
}

scrapePage();
