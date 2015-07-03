var React = require('react');
module.exports = React.createClass({

    render() {
        return <div className={this.props.sectionType + '-section'}>
            <div className='section-title'>
                {this.props.section.title}
            </div>
            <p className='section-instructions'>
                {this.props.section.instructions}
            </p>
            <div id={this.props.sectionType + '-' + this.props.section.id}
                contentEditable={this.props.hideWork}
                className='section-work'>
                {this.renderWork()}
            </div>
        </div>
    },

    renderWork() {
        if (!this.props.hideWork)
            return this.props.section.work;
    }
});

