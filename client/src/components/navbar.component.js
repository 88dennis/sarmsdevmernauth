import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">ATracker</Link>
                <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Activity</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Activity Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/member" className="nav-link">Create Member</Link>
                        </li>
                    </ul>
                </div>


            </nav>
                
            </>
        )
    }
}

export default Navbar;
