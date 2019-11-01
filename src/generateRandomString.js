// // Generates a 5-character alphanumeric string.
// // // Used to generate random strings for both urlIDs & userIDs
const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 7);
};


// Export Function
module.exports = generateRandomString;

