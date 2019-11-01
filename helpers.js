const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};

const findUserAccountbyEmail = (submittedEmail, database) => {
  for (const userId in database) {
    if (submittedEmail === database[userId].email) {
      return userId;
    }
  }
  return false;
};

const urlsForUser = (id, database) => {
  const filteredUrlDB = {};
  for (const shortURL in database) {
    if (database[shortURL].userID === id) {
      filteredUrlDB[shortURL] = database[shortURL].longURL;
    }
  } return filteredUrlDB;
};
