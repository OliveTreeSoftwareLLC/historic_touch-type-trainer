var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var ERRORS_EVENT = 'errors_change';
var TIMERS_CHANGE_EVENT = 'timers_change';
var LESSON_COMPLETE_EVENT = 'lessonComplete_change';

var _errorData = [ ];
var _timers = [];
var _lesson = {
    "id": "aksdjfas;kjkas;ajf",
    "title": "Lesson 1",
    "scoreReq": 80,
    "allowRedo": false,
    "newKeys": [
        "F",
        "J"
    ],
    "showKeyboard": true,
    "sections": [
        {
            "id": "gobbledygookabc",
            "title": "Section 1",
            "isTimed": true,
            "timeLimit": 2,
            "instructions": "Just type whatever is in this section. There are no special instructions, I just want a paragraph here to see what its appearance is and to style it properly.",
            "work": "fff jj fj jf jj ff jf jjf jjjf ffj jff jj"
        },
        {
            "id": "gobbledygookdef",
            "title": "Section 2",
            "instructions": "You've done this before.",
            "work": "jj fff jf fj fj jjf jjf ff jf ffj fj"
        },
        {
            "id": "gobbledygookghi",
            "title": "Section 3",
            "instructions": "Do it once again.",
            "work": "fj fj jf"
        },
        {
            "id": "gobbledygookjkl",
            "title": "Section 4",
            "instructions": "Are you getting tired of this yet? Ha! just wait till you see the next lesson. You'll wish you were still doing this one!",
            "work": "fj jj jjj ff jjf ffj"
        }
    ]
};

var _activeSection = null;
var _lessonComplete = false;
var LessonStore = assign({}, EventEmitter.prototype, {

  getLesson: function() {
    return _lesson;
  },

  getActiveSection: function() {
    if (!_activeSection)
      LessonStore.setNextSection();
    return _activeSection;
  },

  setNextSection: function() {
    if (!_activeSection)
      _activeSection = _lesson.sections[0];
    else {
      var i = _lesson.sections.indexOf(_activeSection) + 1;
      if (i === _lesson.sections.length) {
        _lessonComplete = true;
        this.emitLessonCompleteChange();
      }
      else
        _activeSection = _lesson.sections[i];
    }
  },

  getErrorData: function() {
    return _errorData;
  },

  getErrorDataUnique: function() {
    var unique = [];
    var i = null;
    _errorData.forEach(function (item) {
      i = unique.map(function(el){
              return el.correctKey + el.typedKey
            }).indexOf(item.correctKey + item.typedKey);
      if (i < 0)
        unique.push({
          correctKey: item.correctKey,
          typedKey: item.typedKey,
          count: 1
        });
      else
        unique[i].count = unique[i].count + 1;
    });
    return unique;
  },

  isLessonComplete: function() {
    return _lessonComplete;
  },

  getLessonCharCount: function() {
    var sum = _lesson.sections.reduce(function(total, section) {
        return total + section.work.length
    }, 0);
    return sum;
  },

  getTotalErrors: function() {
    return _errorData.length;
  },

  getTimers: function() {
    return _timers;
  },

  getScore: function() {
    if (!_lessonComplete)
      return null;

    var count = this.getLessonCharCount();
    var errors = this.getTotalErrors();
    return Math.round(100 - (errors / count * 100));
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

  emitLessonCompleteChange: function() {
    this.emit(LESSON_COMPLETE_EVENT);
  },

  addLessonCompleteChangeListener: function(callback) {
    this.on(LESSON_COMPLETE_EVENT, callback);
  },

  removeLessonCompleteChangeListener: function(callback) {
    this.removeListener(LESSON_COMPLETE_EVENT, callback);
  },

  emitTimersChange: function() {
    this.emit(TIMERS_CHANGE_EVENT);
  },

  addTimersChangeListener: function(callback) {
    this.on(TIMERS_CHANGE_EVENT, callback);
  },

  removeTimersChangeListener: function(callback) {
    this.removeListener(TIMERS_CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case 'ADD_TIMER':
        if (_activeSection.isTimed) {
          _timers.push( action.timer );
          LessonStore.emitTimersChange();
        }
        break;

      case 'SET_LESSON':
        if (action.lesson) {
          _lessonComplete = false;
          _errorData = [];
          _timers = [];
          _activeSection = null;
          _lesson = action.lesson;
          LessonStore.setNextSection();
          LessonStore.emitLessonCompleteChange();
          LessonStore.emitErrorChange();
          LessonStore.emitTimersChange();
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