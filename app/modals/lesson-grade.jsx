
'use strict'
require("./lesson-grade.css")
var React = require('react');
var Modal = require('./modal');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var LessonStore = require('../stores/lessonStore');

module.exports = React.createClass({

    getInitialState() {
        return { errorData: LessonStore.getErrorDataUnique() };
    },

    render() {
        return <Modal>
            <div className='lesson-grade'>
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
                            <td>{this.getTotalErrors()}</td>
                        </tr>
                    </tfoot>
                </table>
                {this.renderButtons()}
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

    getTotalErrors() {
        var sum = this.state.errorData.reduce(function(total, err) {
            return total.count + err.count
        });
        return sum;
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
