
'use strict'
require("./lesson-grade.css")
var React = require('react');
var Modal = require('./modal');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var LessonStore = require('../stores/lessonStore');

var _lesson = {
    "id": "aksdkas;ajf",
    "title": "Lesson 2",
    "scoreReq": 80,
    "showKeyboard": true,
    "newKeys": [
        "D",
        "K"
    ],
    "fingerGroupsToShow": [
        "home-key" ],
    "sections": [
        {
            "id": "1",
            "title": "Section 1",
            "instructions": "Just type whatever is in this section. There are no special instructions, I just want a paragraph here to see what its appearance is and to style it properly.",
            "work": "dKd"
        },
        {
            "id": "2",
            "title": "Section 2",
            "instructions": "Are you getting tired of this yet? Ha! just wait till you see the next lesson. You'll wish you were still doing this one!",
            "work": "dd kk"
        }
    ]
};
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
        this.clearModal();
    },

    handleNext() {
        AppDispatcher.handleViewAction({
            actionType: 'SET_LESSON',
            lesson: _lesson
        });
        this.clearModal();
    },

    clearModal() {
        AppDispatcher.handleViewAction({
            actionType: 'CLEAR_MODAL'
        });

    }
});
