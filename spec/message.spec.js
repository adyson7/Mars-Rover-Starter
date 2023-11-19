// Importing modules for testing
const Message = require('../message.js');
const Command = require('../command.js');


// Test suite for the Message class
describe("Message class", function() {

  // Test case: Throws an error if name is NOT passed into constructor as the first parameter
  it("throws error if name is NOT passed into constructor as the first parameter", function() {
    // Expectation: Creating a Message instance without a name should throw an error
    // instance = virtual copy of the object
    expect(function() { new Message(); }).toThrow(new Error('Message name required.'));
  });

  // Test case: Constructor sets name
  it("constructor sets name", function() {
    // Creating a Message instance with a given name
    let message = new Message('TestMessage');
    // Expectation: Message instance should have the specified name
    expect(message.name).toEqual('TestMessage');
  });

  // Test case: Constructor sets commands
  it("constructor sets commands", function() {
    // Creating an array of Command instances
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 10)];
    // Creating a Message instance with a name and commands
    let message = new Message('TestMessage', commands);
    // Expectation: Message instance should have the specified commands
    expect(message.commands).toEqual(commands);
  });

  // Test case: Constructor sets received time
  it("constructor sets received time", function() {
    // Creating a Date object for received time
    let receivedTime = new Date();
    // Creating a Message instance with a name, no commands, and received time
    let message = new Message('TestMessage', [], receivedTime);
    // Expectation: Message instance should have the specified received time
    expect(message.receivedTime).toEqual(receivedTime); // Use toEqual for Date objects
  });
  
  // Test: Commands property is an array
  it("commands property is an array", function() {
    // Creating a Message instance with just a name
    let message = new Message('TestMessage');
    // Expectation: The 'commands' property of the Message instance should be an array
    expect(Array.isArray(message.commands)).toBe(true);
  });

  // Test: Commands property defaults to an empty array if not provided
  it("commands property defaults to an empty array if not provided", function() {
    // Creating a Message instance with just a name
    let message = new Message('TestMessage');
    // Expectation: The 'commands' property of the Message instance should be an empty array
    expect(message.commands.length).toEqual(0);
  });

});

