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
      debits: [],
      credits: [],
      debitTotal: 0,
      creditTotal: 0
    }
  }

  handleLogIn = (info) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = info.userName
    this.setState({
      currentUser: newUser
    })
    this.calculateDebit();
    this.calculateCredit();
  }

  componentDidMount = () => {
    this.grabDebit()
    this.grabCredit()
  }

  calculateDebit = () => {
    let total = 0;
    for(let i of this.state.debits) {
        total += i.amount;
    }
    this.setState({
      debitTotal: total,
    })
  }

  calculateCredit = () => {
    let total = 0;
    for(let i of this.state.credits) {
        total += i.amount;
    }
    this.setState({
      creditTotal: total,
    })
  }

  handleAddNewDebit = (item, amounts) => {
    let currentBalance = this.state.accountBalance
    let newDebit = this.state.debits.concat([{
      description: item,
      amount: amounts,
      date: Date.now()
    }]);

    let newTotal = this.state.debitTotal + parseInt(amounts);
    this.setState({
      debits: newDebit,
      debitTotal : newTotal,
      accountBalance: currentBalance - newTotal
    }) 
  }

  handleAddNewCredit = (item, amounts) => {
    let currentBalance = this.state.accountBalance
    let newCredit = this.state.credits.concat([{
      description: item,
      amount: amounts,
      date: Date.now()
    }]);

    let newTotal = this.state.creditTotal + parseInt(amounts);
    this.setState({
      credits: newCredit,
      creditTotal : newTotal,
      accountBalance: currentBalance - newTotal
    }) 
  }

  async grabDebit(){    
    await axios.get('https://moj-api.herokuapp.com/debits')
    .then (response => {
      let result = response.data;
      this.setState({
        debits: result
      })
    }) 
    .catch(err => console.log(err));  
    console.log(this.state.debits)
  }

  async grabCredit(){    
    await axios.get('https://moj-api.herokuapp.com/credits')
    .then (response => {
      let result = response.data;
      this.setState({
        credits: result
      })
    }) 
    .catch(err => console.log(err));
    console.log(this.state.credits);  
  }

  render () {
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} debitTotal={this.state.debitTotal} creditTotal = {this.state.creditTotal}/>);
    const UserProfileComponent = () => (<UserProfile userName = {this.state.currentUser.userName} memberSince = {this.state.currentUser.memberSince}/>);
    const LogInComponent = () => (<LogIn user={this.state.currentUser} handleLogIn={this.handleLogIn} {...this.props}/>)
    const DebitComponent = () => (<Debit accountBalance = {this.state.accountBalance} debits = {this.state.debits} debitTotal = {this.state.debitTotal} handleAddNewDebit = {this.handleAddNewDebit}/>)
    const CreditComponenet = () => (<Credit accountBalance = {this.state.accountBalance} credits = {this.state.credits} creditTotal = {this.state.creditTotal} handleAddNewCredit = {this.handleAddNewCredit}/>)
    return (
      <Router>
        <Switch>
            <Route exact path = "/" render={LogInComponent}/>
            <Route exact path = "/userProfile" component={UserProfileComponent}/>
            <Route exact path = "/home" component = {HomeComponent}/>
            <Route exact path = "/debit" component = {DebitComponent}/>
            <Route exact path = "/credit" component = {CreditComponenet}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
