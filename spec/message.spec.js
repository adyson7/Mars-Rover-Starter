const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
   
  it("throws error if name is NOT passed into constructor as the first parameter", function() {
    expect(function() { new Message(); }).toThrow(new Error('Message name required.'));
  });

  it("constructor sets name", function() {
    let message = new Message('TestMessage');
    expect(message.name).toEqual('TestMessage');
  });

  it("constructor sets commands", function() {
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 10)];
    let message = new Message('TestMessage', commands);
    expect(message.commands).toEqual(commands);
  });

  it("constructor sets received time", function() {
    let receivedTime = new Date();
    let message = new Message('TestMessage', [], receivedTime);
    expect(message.receivedTime).toEqual(receivedTime);
  });

  it("commands property is an array", function() {
    let message = new Message('TestMessage');
    expect(Array.isArray(message.commands)).toBe(true);
  });

  it("commands property defaults to an empty array if not provided", function() {
    let message = new Message('TestMessage');
    expect(message.commands.length).toEqual(0);
  });

});
