// Requirements and dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const app = express();
const PORT = 3000; // default port 8080


// Example Data
// URLs Belong to Users
// In order to keep track of which URLs belong to particular users, we'll need to associate each new URL with the user that created it.

// Up to this point, our urlDatabase was an object with shortURL keys and longURL values. Now that we have more data to keep track of, lets change the structure of our uRLDatabase. We'll keep the shortURL as the key, but we'll change the value to an object that has longURL and userID keys itself. Here's an example:

const urlDatabase = {
  b6UTxQ: { longURL: "http://www.medium.com", userID: "g33k3" },
  i3BoGr: { longURL: "https://streamable.com/0lru8", userID: "b33bL" }
};

// Add a new userID (string) property to individual url objects within the urlDatabase collection. It should just contain the user ID (the key in the users collection) and not a copy of the entire user data. All URLs should now have this extra property.

const users = {
  "g33k3": {
    email: "asdf@asdf.asdf",
    password: "asdf"
  },
  "b33bL": {
    email: "qwer@qwer.qwer",
    password: "qwer"
  }
};


// Worker Functions
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};

const findUserAccountbyEmail = (submittedEmail) => {
  for (const userId in users) {
    if (submittedEmail === users[userId].email) {
      return userId;
    }
  } return false;
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
  if (req.body.email === "" | req.body.password === "") {
    res.status(400).send('empty login field');
  } else if (!findUserAccountbyEmail(req.body.email)) {
    res.status(403).send("don't see that email address");
  } else if (req.body.password === users[findUserAccountbyEmail(req.body.email)].password) {
    res.cookie("user_id", findUserAccountbyEmail(req.body.email));
    res.redirect(`/urls`);
  } else {
    res.status(403).send('right email, wrong password');
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
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

app.post("/register", (req, res) => {
  let newUserID = generateRandomString();
  if (req.body.email === "" | req.body.password === "" | req.body.confirmPassword === "") {
    res.status(400).send('nah, man');
  } else if (findUserAccountbyEmail(req.body.email)) {
    res.status(400).send('nuh uh');
  } else if (req.body.password === req.body.confirmPassword) {
    users[newUserID] = { email: req.body.email, password: req.body.password };
    res.cookie("user_id", newUserID);
    res.redirect(`/urls`);
  } else {
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
    user_id: req.cookies.user_id
  };
  if(templateVars.user_id) {
    res.render("urls_index", templateVars);
  } else {
    res.render("users_login", templateVars);
  }
});

app.get("/urls/new", (req, res) => {
  let templateVars = {
    urls: urlDatabase,
    user_id: req.cookies.user_id
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    user_id: req.cookies.user_id
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
    user_id: req.cookies.user_id
  };
  res.render("users_registration", templateVars);
});

app.get("/login", (req, res) => {
  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    user_id: req.cookies.user_id
  };
  res.render("users_login", templateVars);
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

