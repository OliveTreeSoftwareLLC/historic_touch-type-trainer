var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var ERRORS_EVENT = 'errors_change';

var _errorData = [];

var _lesson = {
    "id": "aksdjfas;kjkas;ajf",
    "title": "Lesson 1",
    "newKeys": [
        "F",
        "J"
    ],
    "showKeyboard": true,
    "fingerGroupsToShow": [
        "home-key",
        "left-index",
        "left-middle" ],
    "sections": [
        {
            "id": "gobbledygookabc",
            "title": "Section 1",
            "instructions": "Just type whatever is in this section. There are no special instructions, I just want a paragraph here to see what its appearance is and to style it properly.",
            "work": "fff jf jf fj jf jjf fj jf jjj fff jf jf fj jf jjfffj jf fj jf jjfffj jf fff jf jf fj jf"
        },
        {
            "id": "gobbledygookdef",
            "title": "Section 2",
            "instructions": "You've done this before.",
            "work": "fff jj"
        },
        {
            "id": "gobbledygookghi",
            "title": "Section 3",
            "instructions": "Do it once again.",
            "work": "fj jf jjfffj jjf fj jf jjj fff jf jf"
        },
        {
            "id": "gobbledygookjkl",
            "title": "Section 4",
            "instructions": "Are you getting tired of this yet? Ha! just wait till you see the next lesson. You'll wish you were still doing this one!",
            "work": "fj jf jjfffj jjf fj jf jjj fff jf jf fff jf jf fj jjf fj jf jjj jf jjfffj jjf fj jf jjj fff jf jf fj jf jjfffj jf fj jf jjfffj jf"
        }
    ]
};

var _activeSection = _lesson.sections[0];

var LessonStore = assign({}, EventEmitter.prototype, {

  getLesson: function() {
    return _lesson;
  },

  getActiveSection: function() {
    return _activeSection;
  },

  setNextSection: function() {
    if (!_activeSection)
      _activeSection = _lesson.sections[0];
    else {
      var i = _lesson.sections.indexOf(_activeSection) + 1;
      if (i === _lesson.sections.length)
        alert('Finished with Lesson!');
      else
        _activeSection = _lesson.sections[i];
    }
  },

  getErrorData: function() {
    return _errorData;
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

  emitErrorChange: function() {
    this.emit(ERRORS_EVENT);
  },

  addErrorChangeListener: function(callback) {
    this.on(ERRORS_EVENT, callback);
  },

  removeErrorChangeListener: function(callback) {
    this.removeListener(ERRORS_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case 'SET_LESSON':
        if (action.lesson) {
          _lesson = action.lesson;
          LessonStore.emitChange();
        }
        break;

      case 'SET_ACTIVE_SECTION':
        if (action.section && action.section !== _activeSection) {
          _activeSection = action.section;
          LessonStore.emitChange();
        }
        break;

      case 'SET_NEXT_SECTION':
        LessonStore.setNextSection();
        LessonStore.emitChange();
        break;

      case 'STORE_KEY_ERROR':
        if (action.errData) {
          _errorData.push(action.errData);
          LessonStore.emitErrorChange();
        }
        break;
    }
    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = LessonStore;