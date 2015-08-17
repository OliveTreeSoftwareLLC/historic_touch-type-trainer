
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
        LessonStore.addLessonCompleteChangeListener(this.isCompleteChanged);
        LessonStore.addTimersChangeListener(this.timersChanged);
        this.setFocus();
    },

    componentWillUnmount() {
        LessonStore.removeChangeListener(this._onChange);
        LessonStore.removeLessonCompleteChangeListener(this.isCompleteChanged);
        LessonStore.removeTimersChangeListener(this.timersChanged);
    },

    componentDidUpdate() {
        this.setFocus();
    },

    _onChange() {
        this.setState({ lesson: LessonStore.getLesson(),
            activeSection: LessonStore.getActiveSection() });
    },

    isCompleteChanged() {
        if (LessonStore.isLessonComplete())
            return;

        this.state.lesson.Sections.map(this.resetSection);
    },

    timersChanged() {
        this.setState({ timers: LessonStore.getTimers() });
    },

    resetSection(section) {
        var el = 'worksheet-' + section.Id;
        document.getElementById(el).innerText = '';
    },

    render() {
        return <div className='work-sheet'>
            <div className='work-title'>
                Worksheet for: {this.state.lesson.Title}
            </div>
            {this.renderNewKeys()}
            {this.state.lesson.Sections.map(this.renderSection)}
        </div>;
    },

    renderSection(section) {
        return <Section sectionType='worksheet'
            section={section}
            hideWork='true'
            isActive={this.state.activeSection.Id === section.Id}
            advanceToNextSection={this.advanceToNext}/>;
    },

    renderNewKeys() {
        if (!this.state.lesson.NewKeys || this.state.lesson.NewKeys.length < 1)
            return null;

        return <div className='new-keys'>
                New Keys taught in this lesson: {this.state.lesson.NewKeys.map(function(key) { return key }).join(', ')}
            </div>;
    },

    setFocus() {
        //must use LessonStore at this point to make sure we have the current value
        var el = 'worksheet-' + LessonStore.getActiveSection().Id;
        document.getElementById(el).focus();
    },

    advanceToNext() {
        AppDispatcher.handleViewAction({
            actionType: 'SET_NEXT_SECTION'
        });
    }
});

