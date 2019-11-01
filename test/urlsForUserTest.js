// Dependancies
const help = require("../src/helpers");
const assert = require("chai").assert;


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


// Tests
describe("urlsForUserTest", () => {
  it("should", () => {
    assert.deepEqual(1,1);
  });

  it("should", () => {
    assert.deepEqual(1,1);
  });
});

