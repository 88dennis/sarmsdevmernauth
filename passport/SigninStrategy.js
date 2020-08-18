const Strategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
// const salt = bcrypt.genSaltSync(10);

const LoginStrategy = new Strategy({ passReqToCallback: true, usernameField: 'email'}, async function(req, email, password, done){
        await User.findOne({
            email: email
        })
        .then((existingUser) => {
            if (!existingUser) {
                console.log("NO USER FOUND!!!!!!!!!!!!");
                return done("User does not exist. Please Signup.", null);
            } else {
                    console.log("USER FOUND!!!!!!!!!!!! CHECKING PASSWORD");
                 //from bcryptjs documentation -> if password sent is the same with existing
                    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
                    console.log(isPasswordValid);
                    if(!isPasswordValid){
                         console.log("PASSWORD INVALID!!!!!!!!!!!!!!!!!!");
                        return done('Email or Password not valid', null);
                    }
                    console.log("OK!!!!!!!!!!!!!!!!!!!");
                    return done(null, existingUser, 'Some info');
            }
        })
        .catch((error)=>{
                return done(error, null);
        });
    });
    
    module.exports = LoginStrategy;

    // User.findOne({
    //     email: email
    // }).lean().exec((err, existingUser) => {
    //     if (err) {
    //         return done(err, null);
    //     }
    //     if (!existingUser) {
    //         return done("No existingUser found", null);
    //     }
    //     //from bcryptjs documentation -> if password sent is the same with existing
    //     const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    //     console.log(isPasswordValid);
    //     if(!isPasswordValid){
    //         return done('Email or Password not valid', null);
    //     }
    //     return done(null, existingUser, 'Some info');
    // });