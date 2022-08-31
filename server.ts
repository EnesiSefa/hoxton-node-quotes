import express from "express";
import cors from "cors";

let quotes = [
  {
    id: 1,
    quote:
      "We feel free because we lack the very language to articulate our unfreedom.",
    firstName: "Slavoj",
    lastName: "Žižek",
    age: 73,
    photo:
      "https://www.total-slovenia-news.com/media/k2/items/cache/1de3bbb1ae968833f25f284280bb7206_XL.jpg",
  },
  {
    id: 2,
    quote: "What color is your bugatti?",
    firstName: "Andrew",
    lastName: "Tate",
    age: 35,
    photo:
      "https://identitynewsroom.com/wp-content/uploads/2022/08/Emory-Andrew-Tate-530x450-1.png",
  },
  {
    id: 3,
    quote:
      "You have power over your mind - not outside events. Realize this, and you will find strength.",
    firstName: "Marcus",
    lastName: "Aurelius",
    age: 52,
    photo:
      "https://www.thefamouspeople.com/profiles/images/marcus-aurelius-6.jpg",
  },
];

const app = express();
const port = 4000;
app.use(cors());
app.get("/", (req, res) => {
  res.send(`Welcome`);
});
app.get("/quotes", (req, res) => {
  let itemsToSend = quotes;

  if (req.query.firstName) {
    itemsToSend = itemsToSend.filter(
      (item) => item.firstName === req.query.firstName
    );
  }
  app.post("/quotes", (req, res) => {
    let errors: string[] = [];

    if (typeof req.body.quote !== "string") {
      errors.push("quote not provided or not a string.");
    }

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
        quote: req.body.quote,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        photo: req.body.photo,
      };
      quotes.push(newItem);
      res.send(newItem);
    } else {
      // if there are any errors...
      res.status(400).send({ errors: errors });
    }
  });
  if (req.query.firstName) {
    itemsToSend = itemsToSend.filter(
      // @ts-ignore
      (item) => item.firstName.toLowerCase().includes(req.query.firstName ``.toLowerCase())
    );
  }

  res.send(itemsToSend);
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

app.get("/quotes", (req, res) => {
  res.send(quotes);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
