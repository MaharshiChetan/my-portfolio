const User = require("../models/user");

module.exports = (router) => {
   router.post('/send', (req, res) => {
      console.log(req.body);
      if (!req.body.email) {
         res.json({ success: false, message: "You must provide email" });
      } else {
         if (!req.body.name) {
            res.json({ success: false, message: "You must provide name" });
         } else {
            if (!req.body.message) {
               res.json({ success: false, message: "You must provide message" });
            } else {
               let user = new User({
                  email: req.body.email.toLowerCase(),
                  name: req.body.name.toLowerCase(),
                  message: req.body.message
               })
               user.save(err => {
                  if (err) {
                     if (err.errors) {
                        if (err.errors.email) {
                           res.json({ success: false, message: err.errors.email.message });
                        }
                     } else {
                        res.json({ success: false, message: "Could not send message. Error: ", err });
                     }
                  } else {
                     res.json({ success: true, message: "Message was successfully sent!" });
                  }
               })
            }
         }
      }
   });

   return router;
}