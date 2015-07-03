/** @jsx React.DOM */
'use strict'
require('normalize.css');
require('./index.css');
var React = require('react'),
    Footer = require('./footer/footer'),
    Header = require('./header/header'),
    Login = require('./login/login'),
    Lesson = require('./sheets/lesson-sheet'),
    Work = require('./sheets/work-sheet'),
    AuthStore = require('./stores/AuthenticationStore');
var cx = require('classNames');

var Body = React.createClass({

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
        return <div className='body'>
            <Header/>
            {this.renderLessonSpace()}
            <Footer/>
        </div>;
    },

    renderLessonSpace() {
        if (!this.state.isLoggedIn)
            return <div className='login-space'>
                <Login/>
            </div>;

        return <div className='lesson-space'>
            <div className='sheet-container'>
                <Work className='work-sheet'/>
            </div>
            <div className='sheet-container'>
                <Lesson className='lesson-sheet'/>
            </div>
        </div>;

    }
});

React.renderComponent(<Body />, document.getElementById('content-holder'));