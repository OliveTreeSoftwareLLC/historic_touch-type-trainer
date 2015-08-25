var React = require('react');
var cx = require('classNames');
var AppDispatcher = require('../dispatchers/AppDispatcher');

module.exports = React.createClass({
    getInitialState() {
        return { timer: null }
    },

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
                {this.props.section.Instructions}
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
        return this.props.sectionType + '-' + this.props.section.Id;
    },

    renderTitle() {
        return <div className='section-title'>
            {this.props.section.Title}
        </div>
    },

    renderTimer() {
        if (this.props.section.IsTimed !== true)
            return null;

        var timer = null
        if (!this.state.timer) { //not started yet
            timer = " Type to start timer."
            if (this.props.section.TimeLimit){
                var suffix = this.props.section.TimeLimit > 1 ? "s." : "."
                timer = timer + " You will have " +
                    this.props.section.TimeLimit + " minute" + suffix;
            }
        }
        else
            timer = " timer running..."

        return <div className='section-timer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
                <path d="M2 0v1h1v.03c-1.7.24-3 1.71-3 3.47 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-.45-.1-.87-.25-1.25l-.91.38c.11.29.16.57.16.88 0 1.39-1.11 2.5-2.5 2.5s-2.5-1.11-2.5-2.5 1.11-2.5 2.5-2.5c.3 0 .59.05.88.16l.34-.94c-.23-.08-.47-.12-.72-.16v-.06h1v-1h-3zm5 1.16s-3.65 2.81-3.84 3c-.19.2-.19.49 0 .69.19.2.49.2.69 0 .2-.2 3.16-3.69 3.16-3.69z"/>
            </svg>
            {timer}
        </div>;
    },

    renderWork() {
        if (!this.props.hideWork)
            return this.props.section.Work;
    },

    isCorrectKey(typedKey) {
        var txt = document.getElementById(this.getDivId()).innerText;
        var start = txt.length;
        if (start === 0 && this.props.section.IsTimed)
            this.startTimer();

        var correctKey = this.props.section.Work.substring(start, start + 1);
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
        if (work === this.props.section.Work) {
            if (this.props.section.IsTimed)
                AppDispatcher.handleViewAction({
                    actionType: 'SECTION_TIMER_STOP'
                });

            this.props.advanceToNextSection();
        }

    },

    setSelectionRange(start, end) {
        var id = 'lesson-' + this.props.section.Id;
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
    },

    startTimer() {
        this.setState({ timer: { sectionId: this.props.sectionId,
            start: "now",
        }});
    },

    timerTick() {

    },

    stopTimer() {
        var timer = this.state.timer;
        //TODO add properties such as words per minute to timer
        //before pushing it to lesson store.
        AppDispatcher.handleViewAction({
            actionType: 'ADD_TIMER',
            timer: timer
        });
    }

});

