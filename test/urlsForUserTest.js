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
  it("should return an object with the following 'key: value' pairs 'b6UTxQ: http://www.medium.com' & b7UTxQ: 'http://www.medium.com/tags/elm'", () => {
    assert.deepEqual(help.urlsForUser("g33k3", urlDatabase),
    {
      b6UTxQ: "http://www.medium.com",
      b7UTxQ: "http://www.medium.com/tags/elm"
    });
  });

  it("should return an object with the following 'key: value' pair 'i3BoGr: https://streamable.com/0lru8'", () => {
    assert.deepEqual(help.urlsForUser("b33bL", urlDatabase),
    {
      i3BoGr: "https://streamable.com/0lru8"
    });
  });
});
