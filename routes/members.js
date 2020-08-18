const router = require('express').Router();

let Member = require('../models/member.model');

router.route('/').get((req, res) =>{
    // User.collection.find().toArray()
    Member.find({})
        .then(members => res.json(members))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res)=>{
    const membername = req.body.membername;
    const newMember = new Member({membername});

    console.log(newMember);

    newMember.save()
        .then(()=> res.json(newMember + ' Member added'))
        .catch(err => res.status(400).json('Error : ' + err));
});

module.exports = router;

