
'use strict'
var React = require('react');
var cx = require('classNames');

module.exports = React.createClass({

    render() {

      var classes = cx({
        'key': true,
        'fill-row': this.props.fill
      }, this.groupsToShow());

      return <div className={classes}>
        {this.renderKeyTwo()}
        <div className='key-label'>{this.props.key1}</div>
      </div>
    },

    renderKeyTwo() {
      if (this.props.key2)
        return <div className='key-label2'>
          {this.props.key2}
        </div>
    },

    groupsToShow() {
      if (!this.props.groupsToShow)
        return null;

      var group = this.getFingerGroup();
      var show = this.props.groupsToShow;
      if (show.indexOf(group) < 0)
        group = null;
      return cx({
        'home-key': show.indexOf('home-key') >= 0 && this.isHomeKey()
      }, group);
    },

    isHomeKey() {
      var homeKeys = [ "A", "S", "D", "F", "J", "K", "L", ";", "Space"];
      return homeKeys.indexOf(this.props.key1) >= 0;
    },

    getFingerGroup() {
      var isFound = ["4","5","R","T","F","G","V","B"].indexOf(this.props.key1) >= 0
      if (isFound)
        return 'left-index';

      isFound = ["3", "E", "D", "C" ].indexOf(this.props.key1) >= 0
      if (isFound)
        return 'left-middle';

      isFound = ["2", "W", "S", "X" ].indexOf(this.props.key1) >= 0
      if (isFound)
        return 'left-ring';

      isFound = ["`", "1", "Q", "A", "Z" ].indexOf(this.props.key1) >= 0
      if (isFound)
        return 'left-pinky';

      isFound = ["6", "7", "Y", "U", "H", "J", "N", "M" ].indexOf(this.props.key1) >= 0
      if (isFound)
        return 'right-index';

      isFound = ["8", "I", "K", "," ].indexOf(this.props.key1) >= 0
      if (isFound)
        return 'right-middle';

      isFound = ["9", "O", "L", "." ].indexOf(this.props.key1) >= 0
      if (isFound)
        return 'right-ring';

      isFound = ["0", "-", "=", "P", "[", "]", "&#92;", ";", "'", "/" ].indexOf(this.props.key1) >= 0
      if (isFound)
        return 'right-pinky';
    }

});

