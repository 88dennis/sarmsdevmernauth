const passport = require('passport');
const User = require('../models/user');


// //ADDS THE USER TO THE SESSION
// passport.serializeUser(function(user, done) {
//     console.log("serialized", user)
//     done(null, user._id);
//   });
//   //Every single route the user is going this will check if it contains the id that we added to our serialize
//   passport.deserializeUser(function(id, done) {

//     User.findById(id, function (err, user) {
//       done(err, user);
//     });
//   });


//IN THIS CASE WE USE THE EMAIL AS ID
passport.serializeUser(function(user, done) {
    console.log("SERIALIZED USER: ", user)
    done(null, user.email); 
  });
  
  //Every single route the user is going this will check if it contains the id that we added to our serialize
  passport.deserializeUser( function(email, done) {
    User.findOne({email: email})
        .then((user)=>{
            console.log("DESERIALIZED USER: ", user);
            // user.isAuthenticated = true;
            done(null, user)
        })
        .catch((error)=>{
            done(error, null)
            // console.log(error)
        });
  });


//import all Strategies 
const SigninStrategy = require("./SigninStrategy");
const SignupStrategy = require("./SignupStrategy");
const { response } = require('express');

//"local-signin can be anyname"
passport.use('local-signin', SigninStrategy);
passport.use('local-signup', SignupStrategy);

module.exports = passport;

