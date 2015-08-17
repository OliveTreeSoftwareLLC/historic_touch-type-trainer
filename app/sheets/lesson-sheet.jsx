
'use strict'
require("./sheet.css")
var React = require('react');
var LessonStore = require('../stores/lessonStore');
var Section = require('./section');

module.exports = React.createClass({

    getInitialState() {
        return { lesson: LessonStore.getLesson(),
            activeSection: LessonStore.getActiveSection() };
    },

    componentDidMount() {
        LessonStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        LessonStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState({ lesson: LessonStore.getLesson(),
            activeSection: LessonStore.getActiveSection() });
    },

    render() {
        return <div className='lesson-sheet'>
            <div className='lesson-title'>
                {this.state.lesson.Title}
            </div>
            {this.renderNewKeys()}
            {this.state.lesson.Sections.map(this.renderSection)}
        </div>;
    },

    renderSection(section) {
        return <Section sectionType='lesson'
            section={section}
            isActive={this.state.activeSection.Id === section.Id} />;
    },

    renderNewKeys() {
        if (!this.state.lesson.NewKeys || this.state.lesson.NewKeys.length < 1)
            return null;

        return <div className='new-keys'>
                New Keys taught in this lesson: {this.state.lesson.NewKeys.map(function(key) { return key }).join(', ')}
            </div>;
    }
});

