import express from "express";
import cors from "cors";
import { quotes, authors } from "./data";

const app = express();
const port = 4000;
app.use(cors());
app.get("/", (req, res) => {
  res.send(``);
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
});



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})
