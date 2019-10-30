// Requirements and dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
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
}


// Worker Functions
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};


// Convert incoming requestData from buffer to a useable String
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


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
This endpoint should add a new user object to the global users object.
The user object should include the user's id, email and password, similar to the example above.
To generate a random user ID, use the same function you use to generate random IDs for URLs.
After adding the user, set a user_id cookie containing the user's newly generated ID.
Redirect the user to the /urls page.
Test that the users object is properly being appended to.
You can insert a console.log or debugger prior to the redirect logic to inspect what data the object contains.
Also test that the user_id cookie is being set correctly upon redirection.
You already did this sort of testing in the Cookies in Express activity.
Use the same approach here.
*/

app.post("/register", (req, res) => {
  console.log(users);
  let newUserID = generateRandomString();
  if (req.body.password === req.body.confirmPassword) {
    users[newUserID] = { email: req.body.email, password: req.body.password };
    console.log(users);
    res.redirect(`/urls`);
  } else {
    console.log("they mucked up the password");
    res.redirect(`/register`);
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

