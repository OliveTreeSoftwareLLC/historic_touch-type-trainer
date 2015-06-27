
'use strict'
require("./header.css")
var React = require('react');

module.exports = React.createClass({

    render() {
        return <div className='header'>
            <div className='authentication'>
                Logged in as
            </div>
        </div>;
    }
});
