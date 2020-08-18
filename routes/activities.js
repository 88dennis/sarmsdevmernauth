const router = require('express').Router();
let Activity = require('../models/activity.model');

router.route('/').get((req, res)=> {
    Activity.find()
        .then((activities)=> {
            console.log("Get Activities Route Hit Successfully")
            res.json(activities);
        }).catch((err)=> {
            res.status(400).json('Error: ' + err);
        });
});


router.route('/add').post((req, res) => {
    const membername = req.body.membername;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newActivity = new Activity(
        {
            membername,
            description,
            duration,
            date
        }
    );

    console.log(newActivity);
    newActivity.save()
        .then(()=> res.json('Activity Added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res)=>{
    Activity.findById(req.params.id)
        .then(activity => res.json(activity))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res)=>{
    Activity.findByIdAndDelete(req.params.id)
        .then(() => res.json("Activity Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res)=>{
    Activity.findById(req.params.id)
        .then(activity => {
            activity.membername = req.body.membername;
            activity.description = req.body.description;
            activity.duration = Number(req.body.duration);
            activity.date = Date.parse(req.body.date);
            console.log(activity);
            activity.save()
                .then(()=> res.json('Exercise updated!'))
                .catch( err => res.status(400).json('Error: Activity.findById Save ' + err));
        })
        .catch( err => res.status(400).json('Error: Activity.findById ' + err));
});

module.exports = router;
