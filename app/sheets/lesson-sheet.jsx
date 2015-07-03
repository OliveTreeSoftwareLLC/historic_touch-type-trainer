
'use strict'
require("./sheet.css")
var React = require('react');
var Lesson = require('../stores/lessonStore');
var Section = require('./section');
module.exports = React.createClass({

    render() {
        var lesson = Lesson.getLesson();
        return <div className='lesson-sheet'>
            <div className='lesson-title'>
                {lesson.title}
            </div>
            {lesson.sections.map(this.renderSection)}
        </div>;
    },

    renderSection(section) {
        return <Section sectionType='lesson' section={section}/>;
    }
});

