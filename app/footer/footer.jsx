
'use strict'
require("./footer.css")
var React = require('react');
var AuthStore = require('../stores/AuthenticationStore');
var Lesson = require('../stores/lessonStore');
var Keyboard = require('../keyboard/keyboard');

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
        return <div className='footer'>
            {this.renderContents()}
        </div>;
    },

    renderContents() {
        if (!this.state.isLoggedIn)
            return;

        var lesson = Lesson.getLesson();

        if (!lesson.showKeyboard)
            return;

        return <Keyboard fingerGroupsToShow={lesson.fingerGroupsToShow}/>
    }
});
