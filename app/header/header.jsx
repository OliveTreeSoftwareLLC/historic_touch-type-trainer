
'use strict'
require("./header.css")
var React = require('react');
var AuthStore = require('../stores/AuthenticationStore');
var LessonStore = require('../stores/lessonStore');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = React.createClass({

    getInitialState() {
        return { isLoggedIn: AuthStore.isLoggedIn(),
            errorData: LessonStore.getErrorData()
        };
    },

    componentDidMount() {
        AuthStore.addChangeListener(this._onChange);
        LessonStore.addErrorChangeListener(this._onErrorChange);
    },

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange);
        LessonStore.removeErrorChangeListener(this._onErrorChange);
    },

    _onChange() {
        this.setState({ isLoggedIn: AuthStore.isLoggedIn() });
    },

    _onErrorChange() {
        this.setState({ errorData: LessonStore.getErrorData() });
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
                Errors: {this.errorCount()}
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
    },

    errorCount() {
        if (this.state.errorData)
            return this.state.errorData.length;
        else
            return 0;
    }
});
