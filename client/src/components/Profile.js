import React, { Component } from 'react'
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class Profile extends Component {

        state = {
            email:'',
            userInfo:null,
        }

        componentDidMount(){
            // console.log(this.props);
            const isAuthenticated = window.localStorage.getItem('isAuthenticated');
            console.log(isAuthenticated);
            if(isAuthenticated){
                this.getUser();
            } else {
               console.log("no user")
               this.props.history.replace({
                pathname: "/login",
                state: null,
              });

            }
            
            // this.setState({
            //     email: {...this.props.location.state.email}
            // })
            // console.log("email from signup",this.props.location.state.email);
        }

        getUser = async () => {
            await axios.get('/get-user')
              .then((response)=>{
                  const data = response.data
                console.log(data);
                this.setState({
                  userInfo: data
                })
                console.log("data received", this.state.userInfo);
              })
              .catch((error)=>{
                console.log(error)
              });
          }

        handleLogout = () => {
            localStorage.removeItem("isAuthenticated");
            this.props.history.replace({
                pathname: "/login",
                state: null,
              });
        }
    
    render() {
        // console.log(this.state.email);
        const isAuthenticated2 = window.localStorage.getItem('isAuthenticated');
            console.log(isAuthenticated2);
        if(!isAuthenticated2) {
            return <Redirect to ='/login' />
        } else {
        return (
            <div>
                Profile Component
                <button onClick={this.handleLogout}>Logout</button>
                <div className="form-input">  
                    <Link to="/signup">Signup?</Link>
                    </div>
            </div>
        )
        }
    }
}

export default Profile;
