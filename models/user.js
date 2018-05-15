const mongoose = require('mongoose'); // Node Tool for MongoDB
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Validate Function to check e-mail length
let emailLengthChecker = (email) => {
   // Check if e-mail exists
   if (!email) {
      return false; // Return error
   } else {
      // Check the length of e-mail string
      if (email.length < 5 || email.length > 30) {
         return false; // Return error if not within proper length
      } else {
         return true; // Return as valid e-mail
      }
   }
};

// Validate Function to check if valid e-mail format
let validEmailChecker = (email) => {
   // Check if e-mail exists
   if (!email) {
      return false; // Return error
   } else {
      // Regular expression to test for a valid e-mail
      const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return regExp.test(email); // Return regular expression test results (true or false)
   }
};

// Array of Email Validators
const emailValidators = [
   // First Email Validator
   {
      validator: emailLengthChecker,
      message: 'E-mail must be at least 5 characters but no more than 30'
   },
   // Second Email Validator
   {
      validator: validEmailChecker,
      message: 'Must be a valid e-mail'
   }
];

// Validate Function to check name length
let nameLengthChecker = (name) => {
   // Check if name exists
   if (!name) {
      return false; // Return error
   } else {
      // Check length of name string
      if (name.length < 3 || name.length > 15) {
         return false; // Return error if does not meet length requirement
      } else {
         return true; // Return as valid name
      }
   }
};

// Array of name validators
const nameValidators = [
   // First name validator
   {
      validator: nameLengthChecker,
      message: 'name must be at least 3 characters but no more than 15'
   },
];

// Validate Function to check message length
let messageLengthChecker = (message) => {
   // Check if message exists
   if (!message) {
      return false; // Return error
   } else {
      // Check length of message string
      if (message.length < 60) {
         return false; // Return error if does not meet length requirement
      } else {
         return true; // Return as valid message
      }
   }
};

// Array of message validators
const messageValidators = [
   // Message validator
   {
      validator: messageLengthChecker,
      message: 'message must be at least 60 characters'
   },
];

const userSchema = new Schema({
   name: { type: String, required: true, lowercase: true, validate: nameValidators },
   email: { type: String, required: true, lowercase: true, validate: emailValidators },
   message: { type: String, required: true, validate: messageValidators },
   created: { type: Date, default: Date.now }
});

// Export Module/Schema
module.exports = mongoose.model('User', userSchema);