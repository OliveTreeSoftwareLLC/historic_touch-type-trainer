
'use strict'
require("./keyboard.css")
var React = require('react');
var Key = require('./key');

module.exports = React.createClass({
    getInitialState() {
       return { fingerGroupsToShow: this.props.fingerGroupsToShow };
    },

    render() {
        return <div className='keyboard'>
        <div className='key-row'>
          <Key key1='`' key2='~' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='1' key2='!' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='2' key2='@' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='3' key2='#' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='4' key2='$' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='5' key2='%' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='6' key2='^' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='7' key2='&amp;' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='8' key2='*' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='9' key2='(' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='0' key2=')' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='-' key2='_' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='=' key2='+' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Back Space' fill='true' groupsToShow={this.state.fingerGroupsToShow}/>
        </div>
        <div className='key-row'>
          <Key key1='Tab' fill='true' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Q' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='W' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='E' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='R' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='T' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Y' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='U' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='I' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='O' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='P' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='[' key2='{' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1=']' key2='}' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='&#92;' key2='|' groupsToShow={this.state.fingerGroupsToShow}/>
        </div>
        <div className='key-row'>
          <Key key1='Caps Lock' fill='true' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='A' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='S' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='D' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='F' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='G' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='H' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='J' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='K' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='L' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1=';' key2=':' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='&#39;' key2='&#34;' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Enter' fill='true' groupsToShow={this.state.fingerGroupsToShow}/>
        </div>
        <div className='key-row'>
          <Key key1='Shift' fill='true' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Z' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='X' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='C' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='V' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='B' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='N' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='M' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1=',' key2='<' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='.' key2='>' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='/' key2='?' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Shift' fill='true' groupsToShow={this.state.fingerGroupsToShow}/>
        </div>
        <div className='key-row'>
          <Key key1='Ctrl' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Win' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Alt' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Space' fill='true' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Alt' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Menu' groupsToShow={this.state.fingerGroupsToShow}/>
          <Key key1='Ctrl' groupsToShow={this.state.fingerGroupsToShow}/>
        </div>
      </div>;
    }
});

