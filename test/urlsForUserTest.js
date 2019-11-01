// Dependancies
const help = require("../src/helpers");
const assert = require("chai").assert;


// "Databases"
const urlDatabase = {
  b6UTxQ: { longURL: "http://www.medium.com", userID: "g33k3" },
  b7UTxQ: { longURL: "http://www.medium.com/tags/elm", userID: "g33k3" },
  i3BoGr: { longURL: "https://streamable.com/0lru8", userID: "b33bL" }
};


// Tests
describe("urlsForUserTest", () => {
  it("should return an empty object when given a userID not associated with any urls", () => {
    assert.deepEqual(help.urlsForUser("boogs", urlDatabase),
    {});
  });

  it("should return an object with the following 'key: value' pair 'i3BoGr: https://streamable.com/0lru8'", () => {
    assert.deepEqual(help.urlsForUser("b33bL", urlDatabase),
    {
      i3BoGr: "https://streamable.com/0lru8"
    });
  });
});
