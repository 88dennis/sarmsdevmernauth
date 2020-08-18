import React, { Component } from "react";
import axios from "axios";
// import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
  };

  componentDidMount() {
    // localStorage.removeItem("isAuthenticated");
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    if (email.trim() === "" || password.trim() === "") {
      alert("fillout all the fields");
    } else if (email.includes(" ") || password.includes(" ")) {
      alert("no spaces for email and password pls");
    } else {
      await axios({
        url: "/users/signin",
        method: "POST",
        data: {
          email,
          password,
        },
      })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          const isAuthenticated = response.data.isAuthenticated;
          window.localStorage.setItem("isAuthenticated", isAuthenticated);
          this.props.history.push("/mern/blog");
          // this.clearFields();
        })
        .catch((error) => {
          console.log(error, "REACHED THE ERROR");
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
    return (
      <div className="app">
        <div className="form-input">
          <h1>Login!</h1>
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
            <p>{this.state.errorMessage}</p>
          </div>

          <div className="form-input">
            <button className="button-large">Login</button>
          </div>

          <div className="form-input">
            <Link to="/signup">Signup?</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
