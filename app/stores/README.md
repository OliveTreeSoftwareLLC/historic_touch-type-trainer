# Lesson Object


###Lesson objects are composed of several properties.

|Property|Value(s)|Notes
--- | --- | ---
id| 3997A7AB-DDB0-4477-A442-CF33F16A6F91| Must be unique for each lesson in the system.
title| Lesson 1| Title to show at the top of the page and in the index.
hasIntroduction| true | (optional) Shows an introduction to the lesson by loading a web page from location/getintro?id=lessonId into an iframe above the lesson and work sheets.
scoreReq| 80 | (optional) Forces redo of lesson until minimum score is attained.
allowRedo| false| (optional) Used to force student to only do a lesson once.
newKeys| [ "F","J"] | (optional) New keys taught by this lesson.
showKeyboard| true | (optional) Show keyboard at the bottom of the screen.
fingerGroupsToShow| [ "home-key", "left-index" ] | (optional but requires showKeyboard) Highlights finger groups on the onscreen keyboard. Additional groups are "left-middle" "left-ring" "left-pinky" "right-index" "right-middle" "right-ring" "right-pinky"
sections | [ {section1}, {section2} ] | Array of at least one section. See below for section properties.


###Section objects are composed of several properties.

|Property|Value(s)|Notes
--- | --- | ---
id| 1 | Must be unique for each section in the lesson.
title| Section 1| Title to show at the top of each section
instructions| Type as swiftly as you can while still maintaining accuracy | These instructions will show at the top of the section for the student to read.
work| fff jf fj | This is the actual text that the student will type.
isTimed | true | (optional) Stopwatch style timer unless timeLimit is set.
timeLimit | 1 | (optional requires isTimed) Makes timer a countdown timer instead of a stopwatch. Value is in minutes.
