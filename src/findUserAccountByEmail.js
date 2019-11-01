// // Searches a databse for an id using an email address
const findUserAccountByEmail = (submittedEmail, database) => {
  for (const userId in database) {
    if (submittedEmail === database[userId].email) {
      return userId;
    }
  }
};


// Export Function
module.exports = findUserAccountByEmail;

