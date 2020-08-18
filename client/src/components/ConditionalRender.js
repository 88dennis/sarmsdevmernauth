import React, { Component } from "react";
import NavTabs from "./NavTabs";
import Home from "./Home";
import About from "./About";
import Blog from "./Blog";
import ActivityList from "./activity-list.component";
import CreateActivity from "./create-activity.component";
import CreateMember from "./create-member.component";
import EditActivity from "./edit-activity.component";

// import Contact from "./Contact";
import { Redirect } from "react-router-dom";

class ConditionalRender extends Component {
  state = {
    currentPage: "blog",
    id: "home",
  };

  componentDidMount() {
    // console.log(this.props.match.params, "HELLO PROPS");
    //   this.props.getUser();
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    // this.componentDidMount();
  };

  handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    this.props.history.replace({
      pathname: "/login",
      // state: null,
    });

    // this.componentWillUnmount();
  };

  // componentWillUnmount() {}

  // this.state.currentPage === "blog" &&
  renderPage = () => {
    let page = this.props.match.params.page;
    let id = this.props.match.params.id;
    if (page === "home") {
      return <Home handleLogout={this.handleLogout} />;
    } else if (page === "about") {
      return <About />;
    } else if (page === "blog") {
      return <Blog handleLogout={this.handleLogout} />;
    } else if (page === "activity-list") {
      return <ActivityList />;
    } else if (page === "create-activity") {
      return <CreateActivity />;
    } else if (page === "create-member") {
      return <CreateMember />;
    } else if (page === "edit-activity") {
      return <EditActivity id={id} />;
    } else {
      return <Redirect to="/not-found" />;
    }
  };

  render() {
    const isAuthenticated2 = window.localStorage.getItem("isAuthenticated");
    console.log(isAuthenticated2, "AUTHENT");
    if (!isAuthenticated2) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div>
          <NavTabs
            currentPage={this.state.currentPage}
            handlePageChange={this.handlePageChange}
            page2={this.props.match.params.page}
            //   home={this.state.id}
          />
          {this.renderPage()}
        </div>
      );
    }
  }
}

export default ConditionalRender;
