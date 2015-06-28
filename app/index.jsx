/** @jsx React.DOM */
'use strict'
require('normalize.css');
require('./index.css');
var React = require('react'),
    Header = require('./Header/header'),
    Login = require('./Login/login'),
    AuthStore = require('./stores/AuthenticationStore');

React.renderComponent(<Header />, document.getElementById('header'))
if (!AuthStore.isLoggedIn())
    React.renderComponent(<Login />, document.getElementById('content'));