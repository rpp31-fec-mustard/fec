const express = require('express');
const parser = require('body-parser');
const api = require('./apiHelpers.js');
const app = express();

app.use(express.static(__dirname + '/../client/public'));
app.use(parser.json());

app.get('/getReviews', (req, res) => {
  let id = req.query.id;
  let sort = req.query.sort;
  api.getReviews(id, sort, (err, result) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/related', (req, res) => {
  api.getRelated(req.body.product)
    .then((relatedList) => {
      res.status(200).send(relatedList);
    })
    .catch((error) => {
      console.log({error});
      res.status(500).send(error).end();
    });
});

app.get('/questions', (req, res) => {
  api.getQuestions(req.query.productId)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.status(500).end();
    });
});

const port = 5500;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
