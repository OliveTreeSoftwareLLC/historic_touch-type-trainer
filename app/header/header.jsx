
'use strict'
require("./header.css")
var React = require('react'),
    AuthStore = require('../stores/AuthenticationStore');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = React.createClass({

    getInitialState() {
        return { isLoggedIn: AuthStore.isLoggedIn() };
    },

    componentDidMount() {
        AuthStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({ isLoggedIn: AuthStore.isLoggedIn() });
    },

    render() {
        return <div className='header'>
            { this.stats() }
            { this.authenticatedState() }
        </div>;
    },

    stats() {
        if (this.state.isLoggedIn === true)
            return <div className='stats'>
                Errors: 0 WPM: 32
            </div>;
    },

    authenticatedState() {
        if (this.state.isLoggedIn === true)
            return <div className='authentication'>
                {'Logged in as ' + AuthStore.getName()}
                <button onClick={this.LogOut}>Log Out</button>
            </div>
        else
            return <div className='authentication'>
                Not Logged In
            </div>;
    },

    LogOut(){
        AppDispatcher.handleViewAction({
            actionType: 'LOGOUT'
        });
    }
});
