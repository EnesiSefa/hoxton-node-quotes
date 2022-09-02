import express from "express";
import cors from "cors";
import { quotes, authors } from "./data";

const app = express();
const port = 4000;
app.use(cors());
app.get("/", (req, res) => {
  res.send(``);
});
app.get("/testing", (req, res) => {
  res.send("<div>hi</div>");
});

app.get("/quotes", (req, res) => {
  res.send(quotes);
});
app.get("/authors", (req, res) => {
  res.send(authors);
});

app.get("/quotes/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = quotes.find((item) => item.id === id);
  console.log(req.params.id);
  if (match) {
    res.send(match);
  } else {
    res.status(404).send({ error: "Item not found." });
  }
});

app.get("/authors/:id", (req, res) => {
  const id = Number(req.params.id);
  const match = quotes.find((item) => item.id === id);
  console.log(req.params.id);
  if (match) {
    res.send(match);
  } else {
    res.status(404).send({ error: "Item not found." });
  }
});
app.post("/quotes", (req, res) => {
  let errors: string[] = [];

  if (typeof req.body.quote !== "string") {
    errors.push("quote not provided or not a string.");
  }

  if (typeof req.body.authorId !== "number") {
    errors.push("authorId not provided or not a number.");
  }

  // if there are no errors, create the item
  if (errors.length === 0) {
    const newItem = {
      id: quotes[quotes.length - 1].id + 1,
      authorId: req.body.authorId,
      quote: req.body.quote,
    };
    quotes.push(newItem);
    res.send(newItem);
  } else {
    // if there are any errors...
    res.status(400).send({ errors: errors });
  }
});
app.post("/authors", (req, res) => {
  let errors: string[] = [];

  if (typeof req.body.firstName !== "string") {
    errors.push("firstName not provided or not a string.");
  }

  if (typeof req.body.lastName !== "string") {
    errors.push("lastName not provided or not a string.");
  }

  if (typeof req.body.age !== "number") {
    errors.push("age not provided or not a number.");
  }

  if (typeof req.body.photo !== "string") {
    errors.push("photo not provided or not a string.");
  }

  // if there are no errors, create the item
  if (errors.length === 0) {
    const newItem = {
      id: quotes[quotes.length - 1].id + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      photo: req.body.photo,
    };
    authors.push(newItem);
    res.send(newItem);
  } else {
    // if there are any errors...
    res.status(400).send({ errors: errors });
  }
});///
app.delete("/quotes/:id", (req, res) => {
  const foundId = Number(req.params.id);
  const idToDelete = authors.findIndex((author) => author.id === foundId);

  if (idToDelete > -1) {
    // -1 means the object that doesnt exist
    let deletedQuote = quotes.splice(idToDelete, 1)[0];
    // from the array i get the first element [0] because splice returns an array with an object inside
    res.send({ message: "quote deleted successfully", deletedQuote });
  }
});

app.patch("/quotes/:id", (req, res) => {
  // look for the quote
  let id = Number(req.params.id);
  let match = quotes.find((quote) => quote.id === id);

  // if we find the quote:
  if (match) {
    if (req.body.quote) {
      match.quote = req.body.quote;
    }

    if (req.body.authorId) {
      match.authorId = req.body.authorId;
    }

    res.send(match);
  } else {
    // if we don't find the quote:
    res.status(404).send({ error: "quote not found." });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
