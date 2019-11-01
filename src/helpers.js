// Helper Functions

// // Generates a 5-character alphanumeric string.
// // // Used to generate random strings for both urlIDs & userIDs
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};

// // Searches a databse for an id using an email address
const findUserAccountbyEmail = (submittedEmail, database) => {
  console.log(submittedEmail,database);
  for (const userId in database) {
    if (submittedEmail === database[userId].email) {
      return userId;
    }
  }
  return false;
};

// // Filters a url databse for all entries with a given userID
const urlsForUser = (id, database) => {
  const filteredUrlDB = {};
  for (const shortURL in database) {
    if (database[shortURL].userID === id) {
      filteredUrlDB[shortURL] = database[shortURL].longURL;
    }
  } return filteredUrlDB;
};

const users = {
  "g33k3": { email: "asdf@asdf.asdf", password: "asdf" },
  "b33bL": { email: "qwer@qwer.qwer", password: "qwer" }
};

console.log(users[findUserAccountbyEmail("asdf@asdf.asdf", users)].password);

// Export Functions
module.exports = generateRandomString;
module.exports = findUserAccountbyEmail;
module.exports = urlsForUser;