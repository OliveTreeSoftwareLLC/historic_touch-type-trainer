/** @jsx React.DOM */
'use strict'
require('normalize.css');
require('./index.css');
var React = require('react'),
    Header = require('./Header/header'),
    Login = require('./Login/login');

React.renderComponent(<Header />, document.getElementById('header'))
React.renderComponent(<Login />, document.getElementById('content'))