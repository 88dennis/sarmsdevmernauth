import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    bio: "",
    errorMessage: "",
    redirectTo: null,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, bio } = this.state;

    if (email.trim() === "" || password.trim() === "" || bio.trim() === "") {
      alert("fillout all the fields");
    } else if (email.includes(" ") || password.includes(" ")) {
      alert("no spaces for email and password pls");
    } else {
      await axios({
        url: "/users/signup",
        method: "POST",
        data: {
          email,
          password,
          bio,
        },
      })
        .then((response) => {
          console.log(response, "asdasdasd");
          const isAuthenticated = response.data.isAuthenticated;
          window.localStorage.setItem("isAuthenticated", isAuthenticated);
          // this.setState({
          //     redirectTo: "/profile"
          // })
          this.props.history.push("/mern/blog");

          // this.clearFields();
        })
        .catch((error) => {
          console.log(error, "ASDasdASDD");
          this.setState({
            errorMessage: error.response.data,
          });
        });
    }
  };

  clearFields = () => {
    this.setState({
      email: "",
      password: "",
      bio: "",
    });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    console.log(this.state);
    if (this.state.redirectTo) {
      return (
        <Redirect to={{ pathname: this.state.redirectTo, state: this.state }} />
      );
    } else {
      return (
        <div>
          <div className="form-input">
            <h1>Signup Now!</h1>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="form-input">
              <input
                placeholder="enter email as username"
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </div>

            <div className="form-input">
              <input
                placeholder="enter password"
                name="password"
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
            </div>

            <div className="form-input">
              <input
                placeholder="enter your profession"
                name="bio"
                type="text"
                onChange={this.handleChange}
                value={this.state.bio}
              />
            </div>
            <div className="form-input">
              <p>{this.state.errorMessage}</p>
            </div>

            <div className="form-input">
              <button className="button-large">Signup</button>
            </div>

            <div className="form-input">
              <Link to="/login">Login?</Link>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Signup;
