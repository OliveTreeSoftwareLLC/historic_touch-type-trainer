var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _user = {
  id: 'khgglgl',
  name: 'User'
};

function logIn(user) {
  _user.id = user.id;
  _user.name = user.name;
}

function logOut() {
  _user.id = '';
  _user.name = '';
}

var AuthStore = assign({}, EventEmitter.prototype, {

  isLoggedIn: function() {
    if (_user.id && _user.name)
      return true;
    else
      return false;
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

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case 'LOGIN':
        if (action.id !== '' && action.name !== '') {
          logIn({ id: action.id, name: action.name })
          AuthStore.emitChange();
        }
        break;

      case 'LOGOUT':
        logOut();
        AuthStore.emitChange();
        break;

      // add more cases for other actionTypes
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = AuthStore;