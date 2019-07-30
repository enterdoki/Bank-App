import React, {Component} from 'react';
import AccountBalance from "../AccountBalance/AccountBalance";
import {Link} from 'react-router-dom';
import "./Home.css";

class Home extends Component {
    render () {
        return (
            <div className = "home">
              <h1>Bank of React</h1>
              
              <Link to ="/userProfile">User Profile</Link><br></br>
              <Link to ="/debit">Debit</Link><br></br>
              <Link to ="/credit">Credit</Link>
              <AccountBalance accountBalance = {this.props.accountBalance} debitTotal = {this.props.debitTotal} creditTotal = {this.props.creditTotal}/>
            </div>
        );
    }
}

export default Home;