/** @jsx React.DOM */
'use strict'
require('normalize.css');
require('./index.css');
var React = require('react'),
    Footer = require('./footer/footer'),
    Header = require('./header/header'),
    Login = require('./login/login'),
    Lesson = require('./lesson-sheet/lesson-sheet'),
    Work = require('./work-sheet/work-sheet'),
    AuthStore = require('./stores/AuthenticationStore');
var cx = React.addons.classSet;

var Body = React.createClass({

    getInitialState() {
        return { isLoggedIn: AuthStore.isLoggedIn() };
    },

    componentDidMount() {
        AuthStore.addChangeListener(this._onChange);
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    },

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({ isLoggedIn: AuthStore.isLoggedIn() });
    },

    updateDimensions() {
        var width = window.innerWidth;
        this.setState({ horizontalMode: width > 700});
    },

    render() {
        return <div>
            <Header/>
            {this.renderLessonSpace()}
            <Footer/>
        </div>;
    },

    renderLessonSpace() {
        if (!this.state.isLoggedIn)
            return <Login/>;

        var workClasses = cx({
            'sheet-container': true,
            'left': this.state.horizontalMode,
            'bottom': !this.state.horizontalMode
        });


        var lessonClasses = cx({
            'sheet-container': true,
            'right': this.state.horizontalMode,
            'top': !this.state.horizontalMode
        });

        var bodyClasses = cx({
            'body': true,
            'horizontalMode': this.state.horizontalMode
        })

        return <div className={bodyClasses}>
            <div className={lessonClasses}>
                <Lesson className={lessonClasses}/>
            </div>
            <div className={workClasses}>
                <Work />
            </div>
        </div>;

    }
});

React.renderComponent(<Body />, document.getElementById('content'));