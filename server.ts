import express from "express";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send(`Welcome`);
});
app.get("/quotes", (req, res) => {
  res.send([
    {
      id: 1,
      quote:
        "We feel free because we lack the very language to articulate our unfreedom.",
      name: "Slavoj Žižek",
    },
    {
      id: 2,
      quote: "What color is your bugatti?",
      name: "Andrew tate",
    },
    {
      id: 3,
      quote: "I'll be back",
      name: "T-800",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
