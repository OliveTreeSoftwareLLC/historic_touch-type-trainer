var React = require('react');
var cx = require('classNames');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = React.createClass({

    render() {
        var classes = cx({
            'active-section': this.props.activeSection.id === this.props.section.id
        }, this.props.sectionType + '-section' );

        return <div className={classes}>
            <div className='section-title'>
                {this.props.section.title}
            </div>
            <p className='section-instructions'>
                {this.props.section.instructions}
            </p>
            <div id={this.getDivId()}
                tabIndex='0'
                contentEditable={this.props.hideWork}
                onFocus={this.setActiveSection}
                onKeyDown={this.handleKeyDown}
                onKeyPress={this.handleKeyPress}
                className='section-work'>
                {this.renderWork()}
            </div>
        </div>
    },

    getDivId() {
        return this.props.sectionType + '-' + this.props.section.id;
    },

    renderWork() {
        if (!this.props.hideWork)
            return this.props.section.work;
    },

    handleKeyDown(e) {
        if (e.keyCode >= 32 && e.keyCode <= 127)
            return; //allow key press to hand these
    },

    handleKeyPress(e) {
        if (e.charCode < 32 && e.charCode > 127)
            return; //don't handle anything not in the normal range
        var start =document.getElementById(this.getDivId()).innerText.length;
        var correctKey = this.props.section.work.substring(start, start + 1);
        if (e.key !== correctKey) {
            e.preventDefault();

            AppDispatcher.handleViewAction({
                actionType: 'STORE_KEY_ERROR',
                errData: { correctKey: correctKey, typeKey: e.key }
            });
        }
        // correct key was pressed

    },

    setActiveSection() {
        if (!this.props.hideWork)
            return;

        AppDispatcher.handleViewAction({
            actionType: 'SET_ACTIVE_SECTION',
            section: this.props.section
        });
    }

});

