import React, { Component } from "react";
import API from "../utils/API";

class CreateMember extends Component {
  
    // this.onChangeMemberName = this.onChangeMemberName.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    state = {
      membername: "",
    };
  _isMounted = false;

  // getMaster = () => {
  //     API.getMaster()
  //       .then((res) => {
  //         console.log("COMEBACK FROM MASTER");
  //         console.log(res.data);
  //         console.log("MASTER");
  //         this.setState({
  //           winesMaster: res.data,
  //         });
  //       })
  //       .catch(() =>
  //         this.setState({
  //           message: "Wine not available",
  //         })
  //       );
  //   };

  componentDidMount(){
    this._isMounted = true;
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const member = {
      membername: this.state.membername,
    };
    console.log(member);

    await API.memberCreate(member)
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error on the create member response");
      });
if(this._isMounted){
    this.setState({
      membername: "",
    });
  }

  };

  onChangeMemberName = (e) => {
      this.setState({
        membername: e.target.value,
      });
  };

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Member Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.membername}
              onChange={this.onChangeMemberName}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Member"
              className="btn btn-dark"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateMember;
