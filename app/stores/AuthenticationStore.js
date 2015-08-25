var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var assign = require('object-assign');
var jQuery = require('jquery');

var CHANGE_EVENT = 'change';
var _user = { id: "abc-def-ghi", name: "Melvin Ray"};
var _loginError = null;
var _isWaiting = false;

function logIn(user) {
  _isWaiting = true;
  AuthStore.emitChange();
  jQuery.ajax({
    type: "POST",
    url: "http://localhost:8091/logIn?username=" + user.username + "&password=" + user.password,
    success: handleSubmitSuccess,
    error: handleSubmitFailure,
    dataType: 'json'
  });
}
//    data: { username: user.username, password: user.password },

function handleSubmitSuccess() {
  alert("success");
  _isWaiting = false;
  AuthStore.emitChange();
}

function handleSubmitFailure() {
  alert("failure");
  _isWaiting = false;
  AuthStore.emitChange();
}

function logOut() {
  _user = null;
  AuthStore.emitChange();
}

var AuthStore = assign({}, EventEmitter.prototype, {

  isLoggedIn: function() {
    if (_user && _user.id && _user.name)
      return true;
    else
      return false;
  },

  isWaitingOnServer: function() {
    return _isWaiting;
  },

  getLoginError: function() {
    return _loginError;
  },

  getUser: function() {
    return _user;
  },

  getId: function() {
    return _user.id;
  },

  getName: function() {
    return _user.name;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case 'LOGIN':
        logIn({ username: action.username, password: action.password })
        break;

      case 'LOGOUT':
        logOut();
        break;

      // add more cases for other actionTypes
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AuthStore;