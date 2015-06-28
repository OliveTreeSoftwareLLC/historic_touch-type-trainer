
'use strict'
require("./login.css")
var React = require('react');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = React.createClass({

    render() {
        return <div className='login'>
            Enter your credentials
            <div>
                <input placeholder='Username'/>
            </div>
            <div>
                <input placeholder='Password'/>
            </div>
            <div>
                <button onClick={this.login}>Login</button>
            </div>
        </div>;
    },

    login() {
        AppDispatcher.handleViewAction({
            actionType: 'LOGIN',
            id: 'guid-here-adsfasdfasdf',
            name: 'Melvin Ray'
        });
    }
});

