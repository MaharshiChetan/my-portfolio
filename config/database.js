const crypto = require('crypto').randomBytes(256).toString('hex');
/*
   Provides cryptographic functionality
   (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)
*/

// Exporting config object
module.exports = {
   uri: "mongodb://root:root123@ds219130.mlab.com:19130/my-portfolio", // Database URI and database name
   secret: crypto, // Crypto created secret
   db: "my-portfolio" // database name
};