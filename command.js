// Defining the Command class
class Command {
  // Constructor for creating Command objects
  constructor(commandType, value) {
    // Setting the commandType property with the provided value
    this.commandType = commandType;

    // Checking if a commandType is provided, throwing an error if not
    if (!commandType) {
      throw Error("Command type required.");
    }

    // Setting the value property with the provided value
    this.value = value;
  }
}

// Exporting the Command class to be used in other modules
module.exports = Command;
