
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
                {this.state.lesson.title}
            </div>
            {this.renderNewKeys()}
            {this.state.lesson.sections.map(this.renderSection)}
        </div>;
    },

    renderSection(section) {
        return <Section sectionType='lesson'
            section={section}
            isActive={this.state.activeSection.id === section.id} />;
    },

    renderNewKeys() {
        if (!this.state.lesson.newKeys || this.state.lesson.newKeys.length < 1)
            return null;

        return <div className='new-keys'>
                New Keys taught in this lesson: {this.state.lesson.newKeys.map(function(key) { return key }).join(', ')}
            </div>;
    }
});

