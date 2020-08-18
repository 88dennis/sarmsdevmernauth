const Strategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const SignupStrategy = new Strategy({ passReqToCallback: true, usernameField: 'email'}, async function(req, email, password, done){

// const SignupStrategy = new Strategy({ passReqToCallback: true},function(req, username, password, done){
    // const email = req.body.email;
    // console.log(email);
    // done(null, email, "someinfo");
    await User.findOne({
        email: email
    })
    .then((user) => {

        console.log("ASDOIASDINAOSDNAOSDINOADSINOADSDIASN ", user);
           if (user) {
        console.log("IMTHEUSER!!!!!!!!!!!!!! ", user)
               console.log("USEREXIST");
                return done('User already exist', null);
            } else {
            const encryptedPassword = bcrypt.hashSync(password, salt);
            //========================
            //ANOTHER WAY TO CREATE -MONGOOSE DOX
                User.create({
                    email: email,
                    password: encryptedPassword,
                    bio: req.body.bio
                }, function(err, insertedUser){
                    if(err){
                        console.log(err);
                        return done(err, null);
                    } else {
                        console.log("SAVED TO THE DB ", insertedUser);
                    return done(null, insertedUser);
                    }
                });
            }
    })
    .catch((error)=>{
            return done(error, null);
    });
   
});

module.exports = SignupStrategy;

// const SignupStrategy = new Strategy({ passReqToCallback: true},function(req, username, password, done){
//     const info = req.body;
//     const user = {username, password};
//     console.log(user);
//     //done() takes in 3 params -> error or null, {username: '', age: 5}, {extra data}
//     done(null, user, info);
//     });

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });
//     }
//   ));



// User.findOne({
//     email: email
// }).lean().exec((err, user) => {
//     if (err) {
//         return done(err, null);
//     }
//     if (user) {
//         return done('User already exist', null);
//     }
//     const encryptedPassword = bcrypt.hashSync(password, salt);

//     //=================================
//     //CREATE A NEW USER
//     // let newUser = new User({
//     //     email: email,
//     //     password: encryptedPassword,
//     //     bio: req.body.bio
//     // });

//     // console.log("FROM SIGNUPSTRATEGY :", newUser);
//     // // done(null, newUser, "some info")

//     // newUser.save((error, insertedUser) => {
//     //     if (error) {
//     //         return done(error, null);
//     //     }
//     //     // delete insertedUser.password;
//     //     console.log("saved to the DB ", insertedUser);
//     //     return done(null, insertedUser);
//     // });
//     //=======================================

//     //========================
//     //ANOTHER WAY TO CREATE -MONGOOSE DOX

//     User.create({
//         email: email,
//         password: encryptedPassword,
//         bio: req.body.bio
//     }, function(err, insertedUser){
//         if(err){
//             console.log(err);
//             return done(error, null);
//         } else {
//             console.log("SAVED TO THE DB ", insertedUser);
//         return done(null, insertedUser);
//         }
//     });


//     //ANOTHER WAY - MONGODB DOX
//     // try {
//     //     User.collection.insertOne({
//     //         email: email,
//     //         password: encryptedPassword,
//     //         bio: req.body.bio
//     //     },function(err, insertedUser){
//     //         if(err){
//     //             console.log(err);
//     //             return done(error, null);
//     //         } else {
//     //             console.log("SAVED TO THE DB ", insertedUser.ops);
//     //         return done(null, insertedUser.ops);
//     //         }
//     //     });
//     //  } catch (e) {
//     //     print (e);
//     //  }

// });
