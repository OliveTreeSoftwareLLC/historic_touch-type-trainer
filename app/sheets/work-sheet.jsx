
'use strict'
require("./sheet.css")
var React = require('react');
var LessonStore = require('../stores/lessonStore');
var Section = require('./section');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = React.createClass({

    getInitialState() {
        return { lesson: LessonStore.getLesson(),
            activeSection: LessonStore.getActiveSection() };
    },

    componentDidMount() {
        LessonStore.addChangeListener(this._onChange);
        this.setFocus();
    },

    componentWillUnmount() {
        LessonStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({ lesson: LessonStore.getLesson(),
            activeSection: LessonStore.getActiveSection() });
        this.setFocus();
    },

    render() {
        return <div className='work-sheet'>
            <div className='work-title'>
                Worksheet for: {this.state.lesson.title}
            </div>
            {this.state.lesson.sections.map(this.renderSection)}
        </div>;
    },

    renderSection(section) {
        return <Section sectionType='worksheet'
            section={section}
            hideWork='true'
            activeSection={this.state.activeSection}
            advanceToNextSection={this.advanceToNext}/>;
    },

    setFocus() {
        //must use LessonStore at this point to make sure we have the current value
        var el = 'worksheet-' + LessonStore.getActiveSection().id;
        document.getElementById(el).focus();
    },

    advanceToNext() {
        AppDispatcher.handleViewAction({
            actionType: 'SET_NEXT_SECTION'
        });
    }
});

