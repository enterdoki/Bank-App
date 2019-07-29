import React, {Component} from 'react';
import AccountBalance from "../AccountBalance/AccountBalance";
import {Link} from 'react-router-dom';
import "./Home.css";

class Home extends Component {
    render () {
        return (
            <div>
              <h1>Bank of Narnia</h1>
              
              <Link to ="/userProfile">User Profile</Link>
              <AccountBalance accountBalance = {this.props.accountBalance}/>
              <strong>Debit Total: {this.props.total}</strong><br></br>
              <Link to ="home/debit">Debit</Link><br></br>
              <Link to ="home/credit">Credit</Link>
            </div>
        );
    }
}

export default Home;