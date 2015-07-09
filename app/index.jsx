/** @jsx React.DOM */
'use strict'
require('normalize.css');
require('./index.css');
var React = require('react');
var Footer = require('./footer/footer');
var Header = require('./header/header');
var Login = require('./login/login');
var Lesson = require('./sheets/lesson-sheet');
var LessonGrade = require('./modals/lesson-grade');
var LessonStore = require('./stores/lessonStore');
var Modal = require('./modals/modal');
var ModalStore = require('./stores/modalStore');
var Work = require('./sheets/work-sheet');
var AuthStore = require('./stores/AuthenticationStore');
var AppDispatcher = require('./dispatchers/AppDispatcher');
var cx = require('classNames');

var Body = React.createClass({

    getInitialState() {
        return { isLoggedIn: AuthStore.isLoggedIn(),
            modal: ModalStore.getModal()
        };
    },

    componentDidMount() {
        AuthStore.addChangeListener(this.handleAuthChange);
        ModalStore.addChangeListener(this.handleModalChange);
        LessonStore.addLessonCompleteChangeListener(this.handleLessonComplete);
        this.handleLessonComplete();
    },

    componentWillUnmount() {
        AuthStore.removeChangeListener(this.handleAuthChange);
        ModalStore.removeChangeListener(this.handleModalChange);
        LessonStore.removeLessonCompleteChangeListener(this.handleLessonComplete);
    },

    handleAuthChange() {
        this.setState({ isLoggedIn: AuthStore.isLoggedIn() });
    },

    handleModalChange() {
        this.setState({ modal: ModalStore.getModal() });
    },

    render() {
        return <div className='body'>
            <Header/>
            {this.renderLessonSpace()}
            <Footer/>
            {this.renderModal()}
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

    },

    renderModal() {
        return this.state.modal;
    },

    handleLessonComplete() {
        if (LessonStore.isLessonComplete()) {
            AppDispatcher.handleViewAction({
                actionType: 'SET_MODAL',
                modal: React.createElement(LessonGrade)
            });
        }
    }
});

React.render(<Body />, document.getElementById('content-holder'));
document.body.setAttribute('spellcheck', false);