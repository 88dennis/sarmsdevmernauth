import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Signup from "./components/Signup"
// import Home from "./components/Home"
// import Blog from "./components/Blog"
// import ActivityList from "./components/activity-list.component"
import EditActivity from "./components/edit-activity.component"
// import CreateActivity from "./components/create-activity.component"
// import CreateMember from "./components/create-member.component"
import ConditionalRender from './components/ConditionalRender';

import NotFound from "./components/NotFound"
import "./App.css"
import LandingPage from './components/LandingPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
          <Route exact path="/" component={LandingPage}/>
            {/* <Route exact path="/mern/home" component={Home}/> */}
            <Route exact path="/mern/:page" component={ConditionalRender}/>
            {/* <Route path="/mern" component={ConditionalRender}/> */}
            <Route path="/profile" component={Profile}/>
            {/* <Route path="/blog" component={Blog}/> */}
            {/* <Route path="/activity-list" exact component = {ActivityList}/> */}
        <Route path="/edit/:id" exact component = {EditActivity}/>
        {/* <Route path="/activity" exact component = {ConditionalRender}/> */}
        <Route path="/member" exact component = {ConditionalRender}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/login" component={Login}/>
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
      
    )
  } 
}

export default App;
