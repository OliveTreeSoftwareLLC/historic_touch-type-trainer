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
            <div id={this.props.sectionType + '-' + this.props.section.id}
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

    renderWork() {
        if (!this.props.hideWork)
            return this.props.section.work;
    },

    handleKeyDown(e) {
        if (e.keyCode >= 32 && e.keyCode <= 127)
            return; //allow key press to hand these
    },

    handleKeyPress(e) {
        if (e.keyCode >= 32 && e.keyCode <= 127)
            alert(e.key);
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

