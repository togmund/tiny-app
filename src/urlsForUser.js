// // Filters a url databse for all entries with a given userID
const urlsForUser = (id, database) => {
  const filteredUrlDB = {};
  for (const shortURL in database) {
    if (database[shortURL].userID === id) {
      filteredUrlDB[shortURL] = database[shortURL].longURL;
    }
  } return filteredUrlDB;
};


// Export Function
module.exports = urlsForUser;

