// Importing modules for testing
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// Test suite for the Rover class
describe("Rover class", function() {

  // Test: Constructor sets position and default values for mode and generatorWatts
  it("constructor sets position and default values for mode and generatorWatts", function() {
    // Creating a new Rover instance with a given position
    let rover = new Rover(98382);
    // Expectations for initial values after creating a Rover instance
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  // Test: Response returned by receiveMessage contains the name of the message
  it("response returned by receiveMessage contains the name of the message", function() {
    // Creating a test message with a status check command
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    // Creating a new Rover instance with a given position
    let rover = new Rover(98382);
    // Calling the receiveMessage method to simulate receiving a message
    let response = rover.receiveMessage(message);
    // Expectation: Response message should match the name of the sent message
    expect(response.message).toEqual('Test message');
  });

  // Test: Response returned by receiveMessage includes two results if two commands are sent in the message
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    // Creating a test message with two commands
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    // Creating a new Rover instance with a given position
    let rover = new Rover(98382);
    // Calling the receiveMessage method to simulate receiving a message
    let response = rover.receiveMessage(message);
    // Expectation: Response should contain two results
    expect(response.results.length).toEqual(2);
  });

  // Test: Responds correctly to the status check command
  it("responds correctly to the status check command", function() {
    // Creating a test message with a status check command
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message', commands);
    // Creating a new Rover instance with a given position
    let rover = new Rover(98382);
    // Calling the receiveMessage method to simulate receiving a message
    let response = rover.receiveMessage(message);
    // Expectations for rover status after a status check command
    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(98382);
  });

  // Test: Responds correctly to the mode change command
  it("responds correctly to the mode change command", function() {
    // Creating a test message with a mode change command
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message', commands);
    // Creating a new Rover instance with a given position
    let rover = new Rover(98382);
    // Calling the receiveMessage method to simulate receiving a message
    let response = rover.receiveMessage(message);
    // Expectations for rover status after a mode change command
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toEqual('LOW_POWER');
  });

  // Test: Responds with a false completed value when attempting to move in LOW_POWER mode
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    // Creating a test message with a mode change and move command in LOW_POWER mode
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12345)];
    let message = new Message('Test message', commands);
    // Creating a new Rover instance with a given position
    let rover = new Rover(98382);
    // Calling the receiveMessage method to simulate receiving a message
    let response = rover.receiveMessage(message);
    // Expectations for response and rover position after attempting to move in LOW_POWER mode
    expect(response.results[1].completed).toBe(false);
    expect(rover.position).toEqual(98382); // Position should not change
  });

  // Test: Responds with the position for the move command
  it("responds with the position for the move command", function() {
    // Creating a test message with a move command
    let commands = [new Command('MOVE', 98765)];
    let message = new Message('Test message', commands);
    // Creating a new Rover instance with a given position
    let rover = new Rover(98382);
    // Calling the receiveMessage method to simulate receiving a message
    let response = rover.receiveMessage(message);
    // Expectations for response and rover position after a move command
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toEqual(98765);
  });

});
