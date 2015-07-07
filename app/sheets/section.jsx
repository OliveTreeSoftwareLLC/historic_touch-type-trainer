var React = require('react');
var cx = require('classNames');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var LessonStore = require('../stores/lessonStore');

module.exports = React.createClass({

    componentDidMount() {
        LessonStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        LessonStore.removeChangeListener(this._onChange);
    },

    _onChange() {

    },

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
        this.setSelectionRange(0, 1);
    },

    getDivId() {
        return this.props.sectionType + '-' + this.props.section.id;
    },

    renderWork() {
        if (!this.props.hideWork)
            return this.props.section.work;
    },

    isCorrectKey(typedKey) {
        var txt = document.getElementById(this.getDivId()).innerText;
        var start = txt.length;
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
        if (work === this.props.section.work)
            this.props.advanceToNextSection();

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

