// Requirements and dependencies
const express = require("express");
const app = express();
const PORT = 3000; // default port 8080


// Example Data
const urlDatabase = {
  "b2xVn2": "http://www.medium.com",
  "9sm5xK": "https://old.reddit.com/r/nba/",
  "hoopsh": "https://streamable.com/0lru8"
};


// Set the view engine
app.set("view engine", "ejs");


// URL routing
app.get("/", (req, res) => {
  res.send("Hello, there!");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});


// Listener
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

