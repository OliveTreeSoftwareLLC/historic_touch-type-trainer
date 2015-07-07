var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _modal = null;

var ModalStore = assign({}, EventEmitter.prototype, {

  getModal: function() {
    return _modal;
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
      case 'SET_MODAL': {
          _modal = action.modal;
          ModalStore.emitChange();
        }
        break;

      case 'CLEAR_MODAL': {
          _modal = null;
          ModalStore.emitChange();
        }
        break;
    }
    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = ModalStore;