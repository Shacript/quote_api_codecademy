const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

// get a random quote from quotes array object.
app.get("/api/quotes/random", (req, res) => {
  res.send(getRandomElement(quotes));
});

// get a params person to find which quotes have the same person name if not it will send empty array.
// otherwise if we didn't get any params person it will send all quotes back.
app.get("/api/quotes", (req, res) => {
  const result = req.query.person
    ? quotes.filter((quote) => quote.person === req.query.person)
    : quotes;
  res.send({
    quotes: result,
  });
});

app.listen(PORT, () => {
  console.log("listening on port : " + PORT);
});
