
'use strict'
require("./work-sheet.css")
var React = require('react');
var Lesson = require('../stores/lessonStore');
module.exports = React.createClass({

    render() {
        var lesson = Lesson.getLesson();
        return <div className='work-sheet'>
            <div className='work-title'>
                Worksheet for: {lesson.title}
            </div>
            {lesson.sections.map(this.renderSection)}
        </div>;
    },

    renderSection(section) {
        return <div className='work-section'>
            <div className='section-title'>
                {section.title}
            </div>
            <div className='section-work'>
                <input/>
            </div>
        </div>
    }
});

