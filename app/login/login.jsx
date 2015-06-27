
'use strict'
require("./login.css")
var React = require('react');

module.exports = React.createClass({

    render() {
        return <div className='login'>
            Enter your credentials
            <div>
                <input placeholder='Username'/>
            </div>
            <div>
                <input placeholder='Password'/>
            </div>
            <div>
                <button>Login</button>
            </div>
        </div>;
    }
});

