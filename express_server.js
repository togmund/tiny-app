// Requirements and dependencies
const express = require("express");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser"); // Deprecated for cookie-session
const cookieSession = require("cookie-session");
const bcrypt = require('bcrypt');
const morgan = require('morgan');


// Helper Functions
const help = require('./src/helpers');


// Environment Constants
const app = express();
const PORT = 3000;


// "Databases"
const urlDatabase = {
  b6UTxQ: { longURL: "http://www.medium.com", userID: "g33k3" },
  b7UTxQ: { longURL: "http://www.medium.com/tags/elm", userID: "g33k3" },
  i3BoGr: { longURL: "https://streamable.com/0lru8", userID: "b33bL" }
};

const users = {
  "g33k3": { email: "asdf@asdf.asdf", password: "asdf" },
  "b33bL": { email: "qwer@qwer.qwer", password: "qwer" }
};


// Convert incoming requestData from buffer to a useable String
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser()); // Deprecated for cookie-session
app.use(cookieSession({ name: 'session', keys: ['key1', 'key2'] }));
app.use(morgan('dev'));


// Set the view engine
app.set("view engine", "ejs");


// URL routing

// // POST Methods

// // // Users Methods
app.post("/login", (req, res) => {
  if (req.body.email === "" | req.body.password === "") {
    res.status(400).send('empty login field');
  } else if (!help.findUserAccountByEmail(req.body.email, users)) {
    console.log(help.findUserAccountByEmail(req.body.email, users));
    res.status(403).send("don't see that email address");
  } else if (bcrypt.compareSync(req.body.password, users[help.findUserAccountByEmail(req.body.email, users)].password)) {
    req.session.user_id = help.findUserAccountByEmail(req.body.email, users);
    res.redirect(`/urls`);
  } else {
    res.status(403).send('right email, wrong password');
  }
});

app.post("/register", (req, res) => {
  const newUserID = help.generateRandomString();
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  if (req.body.email === "" | req.body.password === "" | req.body.confirmPassword === "") {
    res.status(400).send('Not all fields are full');
  } else if (help.findUserAccountByEmail(req.body.email, users)) {
    res.status(400).send('that email address is in use');
  } else if (bcrypt.compareSync(req.body.confirmPassword, hashedPassword)) {
    users[newUserID] = { email: req.body.email, password: hashedPassword };
    req.session.user_id = newUserID;
    res.redirect(`/urls`);
  } else {
    res.redirect(`/register`);
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

// // // URLs Methods
app.post("/urls", (req, res) => {
  let newShortURL = help.generateRandomString();
  urlDatabase[newShortURL] = {
    longURL: req.body.longURL,
    userID: req.session.user_id
  };
  res.redirect(`/urls/${newShortURL}`);
});

app.post("/urls/:id", (req, res) => {
  if (req.session.user_id === urlDatabase[req.params.id].userID) {
    urlDatabase[req.params.id] = {
      longURL: req.body.longURL,
      userID: req.session.user_id
    };
    res.redirect(`/urls/${req.params.id}`);
  } else {
    res.status(401).send("you don't own this");
  }
});

app.post("/urls/:shortURL/delete", (req, res) => {
  if (req.session.user_id === urlDatabase[req.params.shortURL].userID) {
    delete urlDatabase[req.params.shortURL];
    res.redirect("/urls");
  } else {
    res.status(401).send("you don't own this");
  }
});


// // GET Methods

// // // Users Methods
app.get("/login", (req, res) => {
  const userID = req.session.user_id;
  let templateVars = {
    user_id: userID
  };
  if (templateVars.user_id !== undefined) {
    templateVars.email = users[userID].email;
  }
  res.render("users_login", templateVars);
});

app.get("/register", (req, res) => {
  const userID = req.session.user_id;
  let templateVars = {
    user_id: userID
  };
  if (templateVars.user_id !== undefined) {
    templateVars.email = users[userID].email;
  }
  res.render("users_registration", templateVars);
});

// // // URLs Methods
app.get("/urls", (req, res) => {
  const userID = req.session.user_id;
  let templateVars = {
    urls: help.urlsForUser(req.session.user_id, urlDatabase),
    user_id: userID
  };
  if (templateVars.user_id !== undefined) {
    templateVars.email = users[userID].email;
  }
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const userID = req.session.user_id;
  let templateVars = {
    urls: help.urlsForUser(req.session.user_id, urlDatabase),
    user_id: userID
  };
  if (templateVars.user_id !== undefined) {
    templateVars.email = users[userID].email;
  }
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const userID = req.session.user_id;
  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: help.urlsForUser(req.session.user_id, urlDatabase)[req.params.shortURL],
    user_id: userID
  };
  if (templateVars.user_id !== undefined) {
    templateVars.email = users[userID].email;
  }
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(help.urlsForUser(req.session.user_id, urlDatabase));
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});

// // // Misc Methods
app.get("/", (req, res) => {
  res.send("Hello, there!");
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});


// Listener
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

