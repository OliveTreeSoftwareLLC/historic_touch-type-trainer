
'use strict'
require("./lesson-grade.css")
var React = require('react');
var Modal = require('./modal');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var LessonStore = require('../stores/lessonStore');

module.exports = React.createClass({

    getInitialState() {
        return { errorData: LessonStore.getErrorData() };
    },

    render() {
        return <Modal>
            <div className='lesson-grade'>
                {this.renderErrors()}
                Total Errors = {this.state.errorData.length}
                {this.renderButtons()}
            </div>
        </Modal>;
    },

    renderErrors() {
        return <div>
            {this.state.errorData.map(this.renderError)}
        </div>
    },

    renderError(err) {
        return <div>
            Should have typed; {err.correctKey} but instead typed: {err.typedKey}
        </div>
    },

    renderButtons() {
        return <div>
            <button onClick={this.handleClick}>OK</button>
        </div>;
    },

    handleClick() {
        AppDispatcher.handleViewAction({
            actionType: 'CLEAR_MODAL'
        });
    }
});
