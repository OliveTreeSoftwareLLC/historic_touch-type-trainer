
'use strict'
require("./keyboard.css")
var React = require('react');
var Key = require('./key');

module.exports = React.createClass({

    render() {
        return <div className='keyboard'>
        <div className='key-row'>
          <Key key1='`' key2='~'/>
          <Key key1='1' key2='!'/>
          <Key key1='2' key2='@'/>
          <Key key1='3' key2='#'/>
          <Key key1='4' key2='$'/>
          <Key key1='5' key2='%'/>
          <Key key1='6' key2='^'/>
          <Key key1='7' key2='&amp;'/>
          <Key key1='8' key2='*'/>
          <Key key1='9' key2='('/>
          <Key key1='0' key2=')'/>
          <Key key1='-' key2='_'/>
          <Key key1='=' key2='+'/>
          <Key key1='Back Space' fill='true'/>
        </div>
        <div className='key-row'>
          <Key key1='Tab' fill='true'/>
          <Key key1='Q' />
          <Key key1='W' />
          <Key key1='E' />
          <Key key1='R' />
          <Key key1='T' />
          <Key key1='Y' />
          <Key key1='U' />
          <Key key1='I' />
          <Key key1='O' />
          <Key key1='P' />
          <Key key1='[' key2='{' />
          <Key key1=']' key2='}' />
          <Key key1='&#92;' key2='|' />
        </div>
        <div className='key-row'>
          <Key key1='Caps Lock' fill='true'/>
          <Key key1='A' />
          <Key key1='S' />
          <Key key1='D' />
          <Key key1='F' />
          <Key key1='G' />
          <Key key1='H' />
          <Key key1='J' />
          <Key key1='K' />
          <Key key1='L' />
          <Key key1=';' key2=':' />
          <Key key1='&#39;' key2='&#34;' />
          <Key key1='Enter' fill='true'/>
        </div>
        <div className='key-row'>
          <Key key1='Shift' fill='true'/>
          <Key key1='Z' />
          <Key key1='X' />
          <Key key1='C' />
          <Key key1='V' />
          <Key key1='B' />
          <Key key1='N' />
          <Key key1='M' />
          <Key key1=',' key2='<' />
          <Key key1='.' key2='>' />
          <Key key1='/' key2='?' />
          <Key key1='Shift' fill='true'/>
        </div>
        <div className='key-row'>
          <Key key1='Ctrl' />
          <Key key1='Win' />
          <Key key1='Alt' />
          <Key key1='Space' fill='true' />
          <Key key1='Alt' />
          <Key key1='Menu' />
          <Key key1='Ctrl' />
        </div>      </div>;
    }
});

