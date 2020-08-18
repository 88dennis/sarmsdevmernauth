import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import API from "../utils/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateActivity extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    // this.onChangeDate = this.onChangeDate.bind(this);
    // this.onChangeDescription = this.onChangeDescription.bind(this);
    // this.onChangeDuration = this.onChangeDuration.bind(this);
    // this.onChangeMemberName = this.onChangeMemberName.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      membername: "",
      description: "",
      duration: 0,
      date: new Date(),
      members: [],
      redirectTo: null,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    // this.setState({
    //     members: ['test member', 'dennis'],
    //     membername: 'test member'
    // })

      API.membersGet().then((response) => {
        if (response.data.length > 0) {
    if (this._isMounted) {
          this.setState({
            members: response.data.map((member) => member.membername),
            membername: response.data[0].membername,
          });
        }
          console.log(response.data);
        } else {
    if (this._isMounted) {

          this.setState({
            members: ["Name"],
            membername: "Name",
          });
        }
        }
      });
    
  }

  onChangeMemberName = (e) => {
    this.setState({
      membername: e.target.value,
    });
  };
  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const activity = {
      membername: this.state.membername,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
    console.log(activity);

    await API.activityCreate(activity).then((res) => {
      console.log(res.data);
    if (this._isMounted) {
      this.setState({
        redirectTo: "success",
      });
    }
    });

    // window.location = "/mern/activity-list";
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.redirectTo === "success") {
      return <Redirect to="/mern/activity-list" />;
    }
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Member Name :</label>
            <select
              // ref="memberInput"
              required
              className="form-control"
              value={this.state.membername}
              onChange={this.onChangeMemberName}
            >
              {this.state.members.map(function (member) {
                return (
                  <option key={member} value={member}>
                    {member}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes)</label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Activity Log"
              className="btn btn-dark"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateActivity;
