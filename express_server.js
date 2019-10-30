// Requirements and dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const app = express();
const PORT = 3000; // default port 8080


// Example Data
const urlDatabase = {
  'b2xVn2': "http://www.medium.com",
  '9sm5xK': "https://old.reddit.com/r/nba/",
  'hoopsh': "https://streamable.com/0lru8"
};

const users = {
  "userRandomID": {
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};


// Worker Functions
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};


// Convert incoming requestData from buffer to a useable String
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));


// Set the view engine
app.set("view engine", "ejs");


// URL routing

// POST Methods
app.post("/login", (req, res) => {
  res.cookie("username", req.body.username);
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
});

app.post("/urls", (req, res) => {
  let newShortURL = generateRandomString();
  urlDatabase[newShortURL] = req.body.longURL;
  res.redirect(`/urls/${newShortURL}`);
});

app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect(`/urls/${req.params.id}`);
});

app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");
});

/*
Modify the POST /register endpoint to handle the following error conditions:

If the e-mail or password are empty strings, send back a response with the 400 status code.
If someone tries to register with an email that is already in the users object, send back a response with the 400 status code. Checking for an email in the users object is something we'll need to do in other routes as well. Consider creating an email lookup helper function to keep your code DRY
*/

app.post("/register", (req, res) => {
  let newUserID = generateRandomString();
  console.log(req.body.email, req.body.email in users.email);
  if (req.body.email === "" | req.body.password === "" | req.body.confirmPassword === "") {
    res.status(400).redirect(`/register`);
  }
  else if (req.body.email in users) {
    res.status(400).redirect(`/register`);
  }
  else if (req.body.password === req.body.confirmPassword) {
    users[newUserID] = { email: req.body.email, password: req.body.password };
    res.cookie("user_id", newUserID);
    res.redirect(`/urls`);
  } else {
    res.res.redirect(`/register`);
  }
});


// GET Methods
app.get("/", (req, res) => {
  res.send("Hello, there!");
});

app.get("/urls", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: req.cookies.username
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    username: req.cookies.username
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    username: req.cookies.username
  };
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/register", (req, res) => {
  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    username: req.cookies.username
  };
  res.render("users_registration", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});


// Listener
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

