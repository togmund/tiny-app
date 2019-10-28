// Requirements and dependencies
const express = require("express");
const app = express();
const PORT = 3000; // default port 8080


// Ephemeral Data to push into the page
const urlDatabase = {
  "b2xVn2": "http://www.medium.com",
  "9sm5xK": "https://old.reddit.com/r/nba/",
  "hoopsh": "https://streamable.com/0lru8"
};


// URL routing
app.get("/", (req, res) => {
  res.send("Hello, there!");
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

