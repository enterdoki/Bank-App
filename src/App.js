import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import LogIn from "./components/LogIn/LogIn";
import Debit from "./components/Debit/Debit";
import Credit from "./components/Credit/Credit";
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: "Tom",
        memberSince: "07/29/2019"
      },
      data: [],
      debitTotal: 0,
      fetched: false,
      loggedIn: false
    }
  }

  handleLogIn = (info) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = info.userName
    this.setState({
      currentUser: newUser
    })
    this.calculateDebit();
  }

  componentDidMount = () => {
    this.grabData()
  }

  calculateDebit = () => {
    let total = 0;
    for(let i of this.state.data) {
        total += i.amount;
    }
    this.setState({
      debitTotal: total
    })
  }

  async grabData(){    
    await axios.get('https://moj-api.herokuapp.com/debits')
    .then (response => {
      let result = response.data;
      this.setState({
        data: result,
        fetched:true
      })
    }) 
    .catch(err => console.log(err));
      this.setState({
        fetched:false
      })
      
    
  }

  render () {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} total={this.state.debitTotal}/>);
    const UserProfileComponent = () => (<UserProfile userName = {this.state.currentUser.userName} memberSince = {this.state.currentUser.memberSince}/>);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} handleLogIn={this.handleLogIn} {...this.props}/>)
    const DebitComponent = () => (<Debit data = {this.state.data} total = {this.state.debitTotal}/>)
    const CreditComponenet = () => (<Credit/>)
    return (
      <Router>
        <Switch>
            <Route exact path = "/" 
              render={() => (
                this.state.loggedIn ? (
                  <Redirect to ="/userProfile" component={UserProfileComponent}/>
                  ): (
                  <Redirect to ="/logIn" component = {LogInComponent}/>)
                  )}/>
            <Route exact path = "/userProfile" component={UserProfileComponent}/>
            <Route exact path = "/logIn" component = {LogInComponent}/>
            <Route exact path = "/home" component = {HomeComponent}/>
            <Route exact path = "/home/debit" component = {DebitComponent}/>
            <Route exact path = "/home/credit" component = {CreditComponenet}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
