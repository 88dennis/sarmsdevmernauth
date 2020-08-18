import React from "react";
import { Link } from "react-router-dom";


function NavTabs(props) {
  let page = props.currentPage
  console.log(page);
  console.log(props.page2, "params");
  
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link 
          // onClick={() => props.handlePageChange("home")}
          to={"/mern/home"}
          className={props.currentPage === "home" ? "nav-link active" : "nav-link"}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          // onClick={() => props.handlePageChange("about")}
          to={"/mern/about"}
          className={props.currentPage === "about" ? "nav-link active" : "nav-link"}
        >
          About
        </Link>
      </li>
      <li className="nav-item">
        <Link
          // onClick={() => props.handlePageChange("blog")}
          to={"/mern/blog"}
          className={props.currentPage === "blog" ? "nav-link active" : "nav-link"}
        >
          Blog
        </Link>
      </li>

      <li className="nav-item">
        <Link
          // onClick={() => props.handlePageChange("blog")}
          to={"/mern/activity-list"}
          className={props.currentPage === "activity-list" ? "nav-link active" : "nav-link"}
        >
          Activity List
        </Link>
      </li>

      <li className="nav-item">
        <Link
          // onClick={() => props.handlePageChange("blog")}
          to={"/mern/create-activity"}
          className={props.currentPage === "create-activity" ? "nav-link active" : "nav-link"}
        >
       Create Activity
        </Link>
      </li>
      <li className="nav-item">
        <Link
          // onClick={() => props.handlePageChange("blog")}
          to={"/mern/create-member"}
          className={props.currentPage === "create-member" ? "nav-link active" : "nav-link"}
        >
       Create Member
        </Link>
      </li>
      {/* <li className="nav-item">
        <Link
          // onClick={() => props.handlePageChange("blog")}
          to={"/edit/:id"}
          className={props.currentPage === "edit-activity" ? "nav-link active" : "nav-link"}
        >
       Edit Activity
        </Link>
      </li> */}
      {/* <li className="nav-item">
        <a
          href="#contact"
          onClick={() => props.handlePageChange("Contact")}
          className={props.currentPage === "Contact" ? "nav-link active" : "nav-link"}
        >
          Contact
        </a>
      </li> */}
    </ul>
  );
}

export default NavTabs;
