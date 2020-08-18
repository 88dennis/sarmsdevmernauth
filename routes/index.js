var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});


router.get('/get-user', function(req, res, next) {
   
  if(req.user) {
      console.log(req.user);

      const userInfo = {
        _id: req.user._id,
        email: req.user.email,
        bio: req.user.bio,
      }
      return res.json(userInfo);
    }
    return res.json({message : "no user"});
});
module.exports = router;
