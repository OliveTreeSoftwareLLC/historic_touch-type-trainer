
'use strict'
require("./spinner.css")
var React = require('react');

module.exports = React.createClass({
    render() {
        return <div className="spinner">
            <div>Please Wait....</div>
            <div className="spinner-loading spinner-outer">
                <div className="spinner-loading spinner-inner"/>
            </div>
        </div>;
    }
});
