var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _lesson = {
    "id": "aksdjfas;kjkas;ajf",
    "title": "Lesson 1",
    "newKeys": [
        "F",
        "J"
    ],
    "showKeyboard": true,
    "sections": [
        {
            "id": "gobbledygookabc",
            "title": "Section 1",
            "instructions": "Just type whatever is in this section. There are no special instructions, I just want a paragraph here to see what its appearance is and to style it properly.",
            "work": "jjf fj jf jjj fff jf jf fj jf jjfffj jf fj jf jjfffj jf"
        },
        {
            "id": "gobbledygookdef",
            "title": "Section 2",
            "instructions": "You've done this before.",
            "work": "fff jf jf fj jjf fj jf jjj jf jjfffj"
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

var LessonStore = assign({}, EventEmitter.prototype, {

  getLesson: function() {
    return _lesson;
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
    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = LessonStore;