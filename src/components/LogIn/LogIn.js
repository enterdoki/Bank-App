import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from 'react-router-dom'

class LogIn extends Component {
    constructor () {
        super()
        this.state = {
            user: {
                userName: "",
                passWord: ""
            },
            
        }
    }

    handleChange = e => {
        console.log(e)
        const updatedUser = {...this.state.user}
        const inputField = e.target.name
        const inputValue = e.target.value
        updatedUser[inputField] = inputValue

        this.setState({
            user: updatedUser})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.handleLogIn(this.state.user)
        this.setState({redirect: true})
    }
    render () {
        if (this.state.redirect) {
            return (<Redirect to="/userProfile"/>)
          }
        return (
        <div className = "login">
            <div>
            <TextField
                    label="Enter Username"
                    placeholder="John"
                    className="TextField"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange}
                    
                    
                />
            </div>
            <div>
            <TextField
                    label="Enter Password"
                    placeholder=""
                    className="TextField"
                    margin="normal"
                    variant="outlined"
                    onChange={this.handleChange}
                    
                    
                />
            </div>
                <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={this.handleSubmit}
                >
                    Log In
                </Button>
      </div>
        );

    }
}

export default LogIn;