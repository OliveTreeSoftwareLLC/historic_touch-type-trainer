
'use strict'
require("./lesson-sheet.css")
var React = require('react');
var Lesson = require('../stores/lessonStore');
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
        return <div className='lesson-section'>
            <div className='section-title'>
                {section.title}
            </div>
            <p className='section-instructions'>
                {section.instructions}
            </p>
            <div className='section-work'>
                {section.work}
            </div>
        </div>
    }
});

