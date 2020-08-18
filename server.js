const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const passport = require('./passport');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const activitiesRouter = require('./routes/activities');
const membersRouter = require('./routes/members');

const PORT = process.env.PORT || 8080;
const log = console.log;
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernauth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', ()=>{
  log('Mongoose is connected');
});
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   }

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  }

  // if (process.env.NODE_ENV === 'production') {
  //   app.use(express.static(path.join(__dirname, 'client/build')));
  
  //   // app.get('/', (req, res) => {
  //   //   res.sendFile(path.join(__dirname, 'client/build/index.html'));
  //   // });
  // }

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api", apiRouter);
app.use('/activities', activitiesRouter);
app.use('/members', membersRouter);

// if (process.env.NODE_ENV === 'production') {
//   app.get('*', function(req,res){
//       res.sendFile(path.join(__dirname + 'client/build/index.html'));
//   });
//   }

if (process.env.NODE_ENV === 'production') {
  app.get('*', function(req,res){
      res.sendFile(path.join(__dirname + 'client/build/index.html'));
  });
  }



app.listen(PORT, ()=> {
  log(`Server connected to http://localhost:${PORT}`)
})
module.exports = app;
