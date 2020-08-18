import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
import API from "../utils/API";

const Activity = (props) => (
  <tr>
    <td>{props.activity.membername}</td>
    <td>{props.activity.description}</td>
    <td>{props.activity.duration}</td>
    <td>{props.activity.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.activity._id}>edit</Link> |{" "}
      <Link
        to="/mern/activity-list"
        onClick={() => {
          props.deleteActivity(props.activity._id);
        }}
      >
        delete
      </Link>
    </td>
  </tr>
);

class ActivityList extends Component {
  
    // this.deleteActivity = this.deleteActivity.bind(this);
    state = {
      activities: [],
    };
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
      
    API.activitiesGet()
      .then((response) => {
        console.log(response.data);
        if(this._isMounted ) {
        this.setState({
          activities: response.data,
        });
    }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteActivity = async (id) => {
    await API.activityDelete(id).then((res) => console.log(res.data));
    this.setState({
      activities: this.state.activities.filter((elem) => elem._id !== id),
    });
  };

  activityList = () => {
    return this.state.activities.map((currentactivity) => {
      return (
        <Activity
          activity={currentactivity}
          deleteActivity={this.deleteActivity}
          key={currentactivity._id}
        />
      );
    });
  };

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <h3>Logged Activity</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Member Name</th>
              <th>Description</th>

              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.activityList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ActivityList;
