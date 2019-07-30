import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "./UserProfile.css";

class UserProfile extends Component {
    render () {
        return (
            <div className = "user">
                <Link to ="/home">Home</Link>
                <h1>User Profile</h1>
                <div><h3>Username: {this.props.userName}</h3></div>
                <div><h3>Member Since: {this.props.memberSince}</h3></div>

                <Link to ="/">Logout</Link>              
            </div>
        );
    }
}

export default UserProfile;