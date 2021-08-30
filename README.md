# avaxnewsapi
_An express js api for fetching recent articles from avax.news_

## Dependencies
The API rely on :
* express js for the server
* puppeteer for web scraping

## Basic usage
You can fetch recent articles per category. The API endpoint for that is _/category/:category_. The response is a JSON object containing the title, the cover image, the description and the link of the article. 
Example :
```
/category/fact
```

## Deployed version
You can test it here : https://avaxnewsapi.herokuapp.com/ (not yet functional)

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
