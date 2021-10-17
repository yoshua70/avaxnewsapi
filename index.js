const express = require('express');
const dotenv = require('dotenv');

const scrapper = require('./scrapper');

dotenv.config();
const PORT =  process.env.PORT || 80;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
  # avaxnewsapi
_An express js api for fetching recent articles from avax.news_

## Dependencies
The API rely on :
* express js for the server
* puppeteer for web scraping

## Basic usage
You can fetch recent articles per category. The API endpoint for that is _/category/:category_. The response is a JSON object containing the title, the cover image, the description and the link of the article. 
Example :

/category/fact


## Deployed version
You can test it here : https://avaxnewsapi.herokuapp.com/

## Articles category available
* fact
* wow
* charming
* ohlala
* touching
* funny
* educative
* sad
* disguting

_Note : according to the website, some of these categories are nsfw._
  `)
})

app.get('/category/:category', (req, res) => {
  const { category } = req.params;

  const articles = scrapper.getArticlesPerCategory(category);
  articles.then(promise => res.send({data: promise}))
    .catch(error => res.send(error));
})

app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}`);
})