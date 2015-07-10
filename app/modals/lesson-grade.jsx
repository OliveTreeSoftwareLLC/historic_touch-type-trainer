
'use strict'
require("./lesson-grade.css")
var React = require('react');
var Modal = require('./modal');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var LessonStore = require('../stores/lessonStore');

module.exports = React.createClass({

    getInitialState() {
        return { errorData: LessonStore.getErrorDataUnique(),
            scoreReq: LessonStore.getLesson().scoreReq,
            score: LessonStore.getScore(),
            allowRedo: LessonStore.getLesson().allowRedo
        };
    },

    render() {
        return <Modal footer={this.renderButtons()}>
            <div className='lesson-grade'>
                <div className='lesson-info'>
                    <table>
                        <caption>Lesson Detail</caption>
                        <tr>
                            <th colSpan='2'>{LessonStore.getLesson().title}</th>
                        </tr>
                        <tr>
                            <th>Characters</th>
                            <td>{LessonStore.getLessonCharCount()}</td>
                        </tr>
                        <tr>
                            <th>Errors</th>
                            <td>{LessonStore.getTotalErrors()}</td>
                        </tr>
                        <tfoot>
                            <tr>
                                <th>Score</th>
                                <td>{this.state.score}%</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className='error-info'>
                    <table>
                        <caption>Error Detail</caption>
                        <tr>
                            <th>Key</th>
                            <th>Typed</th>
                            <th>Count</th>
                        </tr>
                        {this.renderErrors()}
                        <tfoot>
                            <tr>
                                <td colSpan="2">Total</td>
                                <td>{LessonStore.getTotalErrors()}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </Modal>;
    },

    renderErrors() {
        return this.state.errorData.map(this.renderError);
    },

    renderError(err) {
        return <tr>
            <td>{err.correctKey}</td>
            <td>{err.typedKey}</td>
            <td>{err.count}</td>
        </tr>
    },

    renderButtons() {
        return <div>
            {this.renderRestart()}
            {this.renderNext()}
        </div>;
    },

    renderNext() {
        if (this.state.allowRedo === false || this.state.score >= this.state.scoreReq)
            return <button onClick={this.handleNext}>Next Lesson</button>;
        else
            return null;
    },

    renderRestart() {
        if (this.state.allowRedo === false)
            return null;

        return <button onClick={this.handleRestart}>Restart Lesson</button>;
    },

    handleRestart() {
        var lesson = LessonStore.getLesson();
        AppDispatcher.handleViewAction({
            actionType: 'SET_LESSON',
            lesson: lesson
        });
        AppDispatcher.handleViewAction({
            actionType: 'CLEAR_MODAL'
        });
    },

    handleNext() {
        AppDispatcher.handleViewAction({
            actionType: 'CLEAR_MODAL'
        });
    }
});
