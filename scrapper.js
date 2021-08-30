const puppepeteer = require('puppeteer');

const getArticles = async (page) => {

  const articles = await page.$$('div.article');
  const articlesData = [];
  
  for (const article of articles) {

    articlesData.push(
      {
        title: await (await article.$('div.breadcrumbs > a:nth-child(2)')).evaluate(article => article.textContent),
        description: await (await article.$('div.text > div.justify')).evaluate(article => article.textContent),
        image: await (await article.$('div.text > a.picture > img')).evaluate(article => article.getAttribute("src")),
        link: "https://avax.news" + await (await article.$('div.breadcrumbs > a:nth-child(2)')).evaluate(article => article.getAttribute("href")),
      }
    )
  }

  return articlesData;
}

const getArticlesPerCategory = async (category) => {

  const browser = await puppepeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  const URL = process.env.URL || 'https://avax.news/';

  await page.goto(URL, {
    waitUntil: 'networkidle0',
  });

  await page.click(`[href="/${category}"]`);

  await page.waitForSelector('.article', {
    visible: true,
  });

  const articlesPerCategory = await getArticles(page);

  return articlesPerCategory;
};


module.exports = {
  getArticlesPerCategory: (category) => getArticlesPerCategory(category)
}