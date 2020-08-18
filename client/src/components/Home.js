import React, { Component } from 'react'

class Home extends Component {
    render() {
        return (
            <div>
                <div className="btn-wrapper">
          <button className="logout-btn" onClick={this.props.handleLogout}>Logout</button>
        </div>
                <h1>Home Component</h1>
            </div>
        )
    }
}

export default Home
