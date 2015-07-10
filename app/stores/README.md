# Lesson Object
Lesson objects are composed of several properties.
|Property|Value(s)|Notes
--- | --- | ---
id| 3997A7AB-DDB0-4477-A442-CF33F16A6F91| Must be unique for each lesson in the system.
title| Lesson 1| Title to show at the top of the page and in the index.
scoreReq| 80| (optional) Forces redo of lesson until minimum score is attained.
allowRedo| false| (optional) Used to force student to only do a lesson once.
newKeys| [ "F","J"] | (optional) New keys taught by this lesson.
showKeyboard| true | (optional) Show keyboard at the bottom of the screen.
fingerGroupsToShow| [ "home-key", "left-index" ] | (optional but requires showKeyboard) Highlights
finger groups on the onscreen keyboard. Additional groups are "left-middle" "left-ring" "left-pinky" "right-index" "right-middle" "right-ring" "right-pinky"





sections| [
{
id| gobbledygookabc|
title| Section 1|
instructions| Just type whatever is in this section. There are no special instructions| I just want a paragraph here to see what its appearance is and to style it properly.|
work| fff
}|
{
id| gobbledygookdef|
title| Section 2|
instructions| You've done this before.|
work| jj
}|
{
id| gobbledygookghi|
title| Section 3|
instructions| Do it once again.|
work| fj
}|
{
id| gobbledygookjkl|
title| Section 4|
instructions| Are you getting tired of this yet? Ha! just wait till you see the next lesson. You'll wish you were still doing this one!|
work| fj
}
]
}