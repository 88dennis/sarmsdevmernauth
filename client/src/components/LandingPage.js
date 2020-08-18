import React, { Component } from 'react'
import { Link } from "react-router-dom";

export class LandingPage extends Component {
    render() {
        return (
            <div>
                   <div className="form-input">  
               
                   <h1> Landing Page</h1>
                   </div>

                <div className="form-input">  
                    <div><Link to="/login">Login </Link> |  <Link to="/signup"> Signup</Link> </div>
                    </div>
                 
            </div>
        )
    }
}

export default LandingPage
