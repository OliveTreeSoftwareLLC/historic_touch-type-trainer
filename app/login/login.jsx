
'use strict'
require("./login.css")
var React = require('react');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = React.createClass({

    componentDidMount() {
        document.getElementById("Username").focus();
    },

    render() {
        return <form className='login'>
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

