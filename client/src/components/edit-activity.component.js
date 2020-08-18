import React, { Component } from "react";
import API from "../utils/API";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class EditActivity extends Component {
  
    // this.onChangeDate = this.onChangeDate.bind(this);
    // this.onChangeDescription = this.onChangeDescription.bind(this);
    // this.onChangeDuration = this.onChangeDuration.bind(this);
    // this.onChangeMemberName = this.onChangeMemberName.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    state = {
      membername: "",
      description: "",
      duration: 0,
      date: new Date(),
      members: [],
      redirectTo: null,
    };

    _isMounted = false;

  componentDidMount() {
    // this.setState({
    //     users: ['test user', 'dennis'],
    //     membername: 'test user'
    // })
    this._isMounted = true;
    console.log(this.props.match.params.id);
    this.getActivity();
  }

  // API.usersGet()
  //     .then(response => {
  //         if(response.data.length > 0){
  //              this.setState({
  //     users: response.data.map(user => user.membername),

  // })
  // console.log(response.data);
  //         } else{
  //             this.setState({
  //                 users:["Name"],
  //                 membername: "Name"
  //             })
  //         }
  //     })
  // }

  getActivity = async () => {
    await API.activityGet(this.props.match.params.id).then((response) => {
      console.log(response.data.membername);
      if(this._isMounted) {
        this.setState({
          membername: response.data.membername,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      }
     
    });
  };

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

    await API.activityEdit(this.props.match.params.id, activity).then((res) => {
      console.log(res.data);
      if (res.data) {
        this.setState({
          redirectTo: "success",
        });
      }
    });

    // window.location = "/mern/blog";
    // return <Redirect to="/mern/blog"/>
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
        <h3>Edit Activity</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>membername :</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.membername}
              onChange={this.onChangeMemberName}
            >
              <option value={this.state.membername}>
                {this.state.membername}
              </option>
              {/* {this.state.users.map(function(user){
                                return <option
                                    key={user}
                                    value={this.state.membername}>
                                        {this.state.membername}
                                    </option>
                            })} */}
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
              value="Update Activity Log"
              className="btn btn-dark"
            />
          </div>
        </form>

        <div className="form-input">
          <Link to="/mern/activity-list">Back to Activity List</Link>
        </div>
      </div>
    );
  }
}

export default EditActivity;
