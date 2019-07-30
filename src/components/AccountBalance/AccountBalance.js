import React, {Component} from 'react';
import "./AccountBalance.css";


class AccountBalance extends Component {
    render () {
        return (
            <div>
                <h3>Balance: ${this.props.accountBalance}</h3>
                <h3>Debits: ${this.props.debitTotal}</h3>
                <h3>Credits: ${this.props.creditTotal}</h3>
            </div>
        );
    }
}

export default AccountBalance;