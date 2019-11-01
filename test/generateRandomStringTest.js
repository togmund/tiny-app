// Dependancies
const help = require("../src/helpers");
const assert = require("chai").assert;

// Tests
describe("generateRandomStringTest", () => {
  it("should generate a random alphanumeric string that is 5 characters long", () => {
    assert.deepEqual(help.generateRandomString().length,5);
  });

  it("should generate a random alphanumeric value that is a string", () => {
    assert.deepEqual(typeof help.generateRandomString(),"string");
  });

  it("should generate a random value that is alphanumeric", () => {
    assert.isTrue(/[\w]/.test(help.generateRandomString()));
  });
});

