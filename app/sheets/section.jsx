var React = require('react');
var cx = require('classNames');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = React.createClass({

    render() {
        var classes = cx({
            'active-section': this.props.isActive
        }, this.props.sectionType + '-section' );

        return <div className={classes}>
            <div className='section-header'>
                {this.renderTitle()}
                {this.renderTimer()}
            </div>
            <p className='section-instructions'>
                {this.props.section.instructions}
            </p>
            <div id={this.getDivId()}
                tabIndex='0'
                contentEditable={this.props.hideWork}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                onKeyPress={this.handleKeyPress}
                onKeyUp={this.handleKeyUp}
                onBlur={this.handleBlur}
                className='section-work'>
                {this.renderWork()}
            </div>
        </div>
    },

    handleBlur() {
        this.setSelectionRange(0, 0);
    },

    handleFocus() {
        if (this.props.sectionType === 'lesson')
            return;

        AppDispatcher.handleViewAction({
            actionType: 'SET_ACTIVE_SECTION',
            section: this.props.section
        });
        var text = document.getElementById(this.getDivId()).innerText;
        this.setSelectionRange(text.length, text.length + 1);
    },

    getDivId() {
        return this.props.sectionType + '-' + this.props.section.id;
    },

    renderTitle() {
        return <div className='section-title'>
            {this.props.section.title}
        </div>
    },

    renderTimer() {
        if (this.props.section.isTimed !== true)
            return null;

        var timer = null
        if (!this.props.timer) { //not started yet
            timer = "Type to start timer."
            if (this.props.section.timeLimit)
                timer = timer + " You will have " + this.props.section.timeLimit + " minute.";
        }
        else
            timer = "timer running"

        return <div className='section-timer'>
            {timer}
        </div>;
    },

    renderWork() {
        if (!this.props.hideWork)
            return this.props.section.work;
    },

    isCorrectKey(typedKey) {
        var txt = document.getElementById(this.getDivId()).innerText;
        var start = txt.length;
        if (start === 0 && this.props.section.isTimed)
            AppDispatcher.handleViewAction({
                actionType: 'SECTION_TIMER_START'
            });

        var correctKey = this.props.section.work.substring(start, start + 1);
        if (typedKey !== correctKey) {
            AppDispatcher.handleViewAction({
                actionType: 'STORE_KEY_ERROR',
                errData: { correctKey: correctKey, typedKey: typedKey }
            });
            return false;
        }
        this.setSelectionRange(start + 1, start + 2);
        return true;
    },

    handleKeyDown(e) {
        if (e.keyCode >= 32 && e.keyCode <= 127)
            return; //allow key press to hand these
        if (e.keyCode === 13) {
            if (!this.isCorrectKey('\n'))
                e.preventDefault();
            return;
        }
    },

    handleKeyPress(e) {
        if (e.charCode < 32 || e.charCode > 127)
            return; //don't handle anything not in the normal range
        if (!this.isCorrectKey(e.key)) {
            e.preventDefault();
            return;
        }
    },

    handleKeyUp() {
        var work = document.getElementById(this.getDivId()).innerText;
        if (work === this.props.section.work) {
            if (this.props.section.isTimed)
                AppDispatcher.handleViewAction({
                    actionType: 'SECTION_TIMER_STOP'
                });

            this.props.advanceToNextSection();
        }

    },

    setSelectionRange(start, end) {
        var id = 'lesson-' + this.props.section.id;
        var el = document.getElementById(id);
        var text = el.innerText;

        if (start !== end) {
            var first = text.slice(0, start);
            var last = '';
            if (end < text.length)
                last = text.slice((text.length - end) * -1);

            text = first.concat(
                    '<span class="highlight">',
                    text.slice(start, end),
                    '</span>',
                    last
                );
        }

        el.innerHTML = text;
    }

});

