
'use strict'
require("./login.css")
var React = require('react');
var AuthStore = require('../stores/AuthenticationStore');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = React.createClass({

    getInitialState() {
        return { isWaiting: AuthStore.isWaitingOnServer(),
            errorData: AuthStore.getLoginError()
        };
    },

    componentDidMount() {
        document.getElementById("Username").focus();
        AuthStore.addChangeListener(this.handleAuthChange);
    },

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.handleAuthChange);
    },

    handleAuthChange() {
        this.setState({
            isWaiting: AuthStore.isWaitingOnServer(),
            errorData: AuthStore.getLoginError()
        });
    },

    render() {
        if (this.state.isWaiting) {
            return <form className='login'>
                <div>
                    Please Wait....
                </div>
            </form>;
        }

        return <form className='login'>
            {this.renderErrorMsg()}
            Enter your credentials
            <div>
                <input id="Username" placeholder='Username'/>
            </div>
            <div>
                <input id="Password" type="password" placeholder='Password'/>
            </div>
            <div>
                <button type='submit' onClick={this.login}>Login</button>
            </div>
        </form>;
    },

    renderErrorMsg() {
        if (!this.state.errorData)
            return null;

        return <div className='login-error'>
            {this.state.errorData}
        </div>
    },

    login() {
        var Username = document.getElementById("Username").value;
        var Pass = document.getElementById("Password").value;
        AppDispatcher.handleViewAction({
            actionType: 'LOGIN',
            username: Username,
            password: Pass
        });
    }
});

