
'use strict'
require("./login.css")
var React = require('react');
var AuthStore = require('../stores/AuthenticationStore');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var Spinner = require('../spinner/spinner');

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
        var isWaiting = AuthStore.isWaitingOnServer();
        this.setState({
            isWaiting: isWaiting,
            errorData: AuthStore.getLoginError()
        });
        if (!isWaiting)
            document.getElementById("Username").focus();
    },

    render() {
        if (this.state.isWaiting) {
            return <form className='login'>
                <Spinner/>
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

