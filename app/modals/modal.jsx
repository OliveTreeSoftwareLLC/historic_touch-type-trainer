
'use strict'
require("./modal.css")
var React = require('react');

module.exports = React.createClass({

    render() {
        return <div className='modal'>
            <div className='modal-blur'/>
            {this.renderContents()}
        </div>;
    },

    renderContents() {
        return <div className='modal-content'>
            {this.props.children}
            {this.renderFooter()}
        </div>
    },

    renderFooter() {
        return <div className='modal-footer'>
            {this.props.footer}
        </div>
    }
});
