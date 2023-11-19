class Message {
   constructor(name, commands, receivedTime = new Date()) {
     if (!name) {
       throw new Error('Message name required.'); //this part of the constructor checks whether the name parameter is falsy //the condition !name checks if name is falsy. The ! operator negates the truthiness of name
     }
 
     this.name = name;
     this.commands = commands || []; //"if commands is truthy, use its value; otherwise (OR) use an empty array []"
     this.receivedTime = receivedTime; // Correctly assigning receivedTime
   }
 }
 
 module.exports = Message;
 