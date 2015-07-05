var React = require('react');
var cx = require('classNames');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var LessonStore = require('../stores/lessonStore');

module.exports = React.createClass({

    componentDidMount() {
        LessonStore.addChangeListener(this._onChange);
        this.setSelectionRange(0, 1);
    },

    componentWillUnmount() {
        LessonStore.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setSelectionRange(0, 1);
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
            <pre id={this.getDivId()}
                tabIndex='0'
                contentEditable={this.props.hideWork}
                onFocus={this.setActiveSection}
                onKeyDown={this.handleKeyDown}
                onKeyPress={this.handleKeyPress}
                onKeyUp={this.handleKeyUp}
                className='section-work'>
                {this.renderWork()}
            </pre>
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
        var start = document.getElementById(this.getDivId()).innerText.length;
        var correctKey = this.props.section.work.substring(start, start + 1);
        if (e.key !== correctKey) {
            e.preventDefault();

            AppDispatcher.handleViewAction({
                actionType: 'STORE_KEY_ERROR',
                errData: { correctKey: correctKey, typeKey: e.key }
            });
            return;
        }
        this.setSelectionRange(start + 1, start + 2);
    },

    handleKeyUp() {
        var work = document.getElementById(this.getDivId()).innerText;
        if (work === this.props.section.work)
            this.props.advanceToNextSection();

    },

    setActiveSection() {
        if (!this.props.hideWork)
            return;

        AppDispatcher.handleViewAction({
            actionType: 'SET_ACTIVE_SECTION',
            section: this.props.section
        });
    },

    setSelectionRange(start, end) {
        if (this.props.section.id !== this.props.activeSection.id)
            return;

        var id = 'lesson-' + this.props.section.id;
        var el = document.getElementById(id);

        var text = el.innerText;
        var first = text.slice(0, start);
        var last = text.slice((text.length - end) * -1);
        text = first.concat(
                '<span class="highlight">',
                text.slice(start, end),
                '</span>',
                last
            );
        el.innerHTML = text;
    }

});

