const express = require('express');
const router = express.Router();
const passport = require('../passport');
const User = require('../models/user');

// passport.authenticate('local-signup', ()=> {

// })

//STANDARD PASSPORT
// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/',
//   failureRedirect: '/home',
//   //disable session
//   session: false
// }));

//CUSTOM PASSPORT CALLBACK FOR REACT -> will send json
router.post('/signup', async (req, res, next)=>{
  //the callback function here is the done() method in the signup strategy
  await passport.authenticate('local-signup', function(error, user, info){
    if(error){
      // return res.json(error);
      return res.status(500).json(error);
    }
    // console.log("This came from routes/users ", user);
    // console.log("This came from routes/users ", info);

    //THIS IS LINKED TO THE SIGNUP STRATEGY DONE() METHOD
    // return res.json(user);

    //USING COOKIE SESSION -> PERSISTENT LOGIN
    req.logIn(user, function(error){
      if(error){
        return res.status(500).json(error);
      }

      // user.isAuthenticated = true;

      console.log("FROM COOKIE SESSION: ", user);
      // if(req.user){
      //   console.log("REQUSERRRRRRRRR ", req.user.email)
      // }

    return res.json({
      isAuthenticated: true,
      email: user.email,
      bio: user.bio
    });
    });

  //  return res.json({
  //     message: "user authenticated"
  //   });
  })(req, res, next)

});


router.post('/signin', async (req, res, next)=>{

  //the callback function here is the done() method in the signup strategy
   await passport.authenticate('local-signin', function(error, user, info){
    if(error){
      // return res.json(error)
      return res.status(500).json(error);
    }
    // console.log("This came from routes/users ", user);
    // console.log("This came from routes/users ", info);
    
    //THIS IS LINKED TO THE SIGNUP STRATEGY DONE() METHOD
    // return res.json(user);


    //USING COOKIE SESSION -> PERSISTENT LOGIN
    req.logIn(user, function(error){
      if(error){
        return res.status(500).json(error);
      }
      // console.log("FROM COOKIE SESSION: ", user);
      // if(req.user){
      //   console.log("REQUSERRRRRRRRR ", req.user.email)
      // }
      // user.isAuthenticated = true;
      // console.log("FROM COOKIE SESSION: ", user.email);
    return res.json({
      isAuthenticated: true,
      email: user.email,
      bio: user.bio
    });
    });

  //  return res.json({
  //     message: "user authenticated"
  //   });
  })(req, res, next)

});

router.post('/check', function(req, res, next) {
  console.log(req.body.email)
  res.json('respond with a resource');
});

router.get('/check', async function(req, res, next) {
  //FROM PASSPORT DESERIALIZE, THE req.user will be available to you or the req.session.passport.session
  if (req.user){
    console.log("there is a user");
    console.log("REQUSER ", req.user);
  console.log("REQUSER2 ", req.session.passport);
  }
  
  // let userOne="";
  const userInfo = await User.collection.findOne({email: req.user.email }); //-> will return an object
  // const userInfo = await User.findOne({email: "dennis@dennis.com" }) //-> will return an object
  // const userInfo = await User.find({email: "dennis@dennis.com" }) //-> will return an array
  // const userInfo = await User.collection.find({email: "dennis@dennis.com" }).toArray();
  console.log(userInfo);

  await User.collection.updateOne({email: userInfo.email}, {'$set': {
    bio: "softeasdasd"
  }});

  const updatedUserInfo = await User.collection.findOne({email:userInfo.email});
  res.json(updatedUserInfo.bio);
});

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;
