// Dependancies
const help = require("../src/helpers");
const assert = require("chai").assert;


// "Databases"
const users = {
  "g33k3": { email: "asdf@asdf.asdf", password: "asdf" },
  "b33bL": { email: "qwer@qwer.qwer", password: "qwer" }
};


// Tests
describe("finderUserAccountByEmailTest", () => {
  it("should find g33k3 when given associated email 'asdf@asdf.asdf'", () => {
    assert.deepEqual(help.findUserAccountByEmail("asdf@asdf.asdf", users),"g33k3");
  });

  it("should return false when given an email not in the database", () => {
    assert.deepEqual(help.findUserAccountByEmail("0987@0987.0987", users),undefined);
  });
});

