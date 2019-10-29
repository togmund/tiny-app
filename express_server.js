// Requirements and dependencies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000; // default port 8080


// Example Data
const urlDatabase = {
  'b2xVn2': "http://www.medium.com",
  '9sm5xK': "https://old.reddit.com/r/nba/",
  'hoopsh': "https://streamable.com/0lru8"
};

// Worker Functions
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
}


// Convert incoming requestData from buffer to a useable String
app.use(bodyParser.urlencoded({ extended: true }));


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

app.post("/urls", (req, res) => {
  let newShortUrl = generateRandomString()
  urlDatabase[newShortUrl] = req.body.longURL;
  res.redirect(`/urls/${newShortUrl}`);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[app.body.shortURL];
  res.redirect("/urls");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  console.log(longURL);
  res.redirect(longURL);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});


// Listener
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

