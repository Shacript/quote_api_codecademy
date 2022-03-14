const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

// get a random quote from quotes array object.
app.get("/api/quotes/random", (req, res) => {
  res.send({
    quote: getRandomElement(quotes),
  });
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

// receive data from query and check if that both exists if true it will add to quotes
// otherwise it will send back status 400
app.post("/api/quotes", (req, res) => {
  const data = req.query;
  if (data.quote && data.person) {
    quotes.push(data);
    res.status(201).send({
      quote: data,
    });
  } else {
    res.status(400).send();
  }
});

// receive param index and data that want to replace from query
// find that quotes with index if found we will replace them with data otherwise send status 404!
app.put("/api/quotes/:index", (req, res) => {
  const index = Number(req.params.index);
  const foundData = quotes[index];
  const updateData = req.query;
  if (foundData) {
    quotes[index] = {
      ...foundData,
      ...updateData,
    };
    res.send(quotes[index]);
  } else {
    res.status(404).send();
  }
});

// receive param index and find that quotes with index
// if found we will remove them and send back status 204 otherwise send status 404!
app.delete("/api/quotes/:index", (req, res) => {
  const index = Number(req.params.index);
  const foundData = quotes[index];
  if (foundData) {
    quotes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

app.listen(PORT, () => {
  console.log("listening on port : " + PORT);
});
