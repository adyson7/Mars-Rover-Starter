// Importing the Command module to work with command objects
const Command = require('./command.js');

// Rover class definition
class Rover {
  // Rover constructor with initial position, default mode, and generatorWatts
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL'; // Default mode
    this.generatorWatts = 110; // Default generatorWatts
  }

  // Method to receive a message and execute its commands
  receiveMessage(message) {
    // Array to store results of command execution
    let results = [];

    // Loop through each command in the message and execute it
    for (let command of message.commands) {
      // Execute the command and store the result
      let result = this.executeCommand(command);
      results.push(result);
    }

    // Return an object containing the message name and the array of results
    return {
      message: message.name,
      results: results
    };
  }

  // Method to execute a single command
  executeCommand(command) {
    // Handling different command types
    if (command.commandType === 'MODE_CHANGE') {
      // If the command is of type 'MODE_CHANGE', update the rover's mode
      this.mode = command.value;
      return { completed: true };
    } else if (command.commandType === 'STATUS_CHECK') {
      // If the command is of type 'STATUS_CHECK', return rover status information
      return {
        completed: true,
        roverStatus: {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position
        }
      };
    } else if (command.commandType === 'MOVE') {
      // If the command is of type 'MOVE', check mode before updating position
      if (this.mode === 'LOW_POWER') {
        // If mode is 'LOW_POWER', the move is not completed
        return { completed: false };
      } else {
        // If mode is not 'LOW_POWER', update the rover's position
        this.position = command.value;
        return { completed: true };
      }
    } else {
      // Unknown command type, return an incomplete result
      return { completed: false };
    }
  }
}

// Exporting the Rover class for use in other modules
module.exports = Rover;

