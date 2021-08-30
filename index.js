const express = require('express');
const dotenv = require('dotenv');

const scrapper = require('./scrapper');

dotenv.config();

const PORT =  process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the unofficial AvaxNews API !')
})

app.get('/category/:category', (req, res) => {
  const { category } = req.params;

  const articles = scrapper.getArticlesPerCategory(category);
  articles.then(promise => res.send(promise))
    .catch(error => res.send(error));
})

app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}`);
})