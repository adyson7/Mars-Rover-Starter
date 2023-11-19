// Importing the Command module to work with command objects
const Command = require('../command.js');

// Command class and its tests
describe("Command class", function() {

  // Test: Throws an error if command type is not passed into the constructor
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    // Expecting that attempting to create a Command without a command type will throw an error
    expect(function() { new Command(); }).toThrow(new Error('Command type required.'));
  });

  // Test: Constructor sets command type
  it("constructor sets command type", function() {
    // Creating a Command with command type 'STATUS_CHECK'
    let command = new Command('STATUS_CHECK');
    // Expecting the command type to be 'STATUS_CHECK'
    expect(command.commandType).toEqual('STATUS_CHECK');
  });

  // Test: Constructor sets a value passed in as the 2nd argument
  it("constructor sets a value passed in as the 2nd argument", function() {
    // Creating a Command with command type 'STATUS_CHECK' and a value of 1200
    let command = new Command('STATUS_CHECK', 1200);
    // Expecting the value to be 1200
    expect(command.value).toEqual(1200);
  });

});
