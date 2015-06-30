
'use strict'
require("./footer.css")
var React = require('react');
var Keyboard = require('../keyboard/keyboard');

module.exports = React.createClass({

    render() {
        return <div className='footer'>
            <Keyboard/>
        </div>;
    }
});
