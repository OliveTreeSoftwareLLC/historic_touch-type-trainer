
'use strict'
require("./keyboard.css")
var React = require('react');

module.exports = React.createClass({

    render() {
        return <ul id="keyboard">
        <li id="row_AE">
          <ul>
            <li id="key_TLDE" class="left5">
              <strong class="deadKey"> ~ </strong>
              <em class="deadKey"> ` </em>
            </li>
            <li id="key_AE01" class="left5">
              <strong> ! </strong>
              <em> 1 </em>
            </li>
            <li id="key_AE02" class="left4">
              <strong> @ </strong>
              <em> 2 </em>
            </li>
            <li id="key_AE03" class="left3">
              <strong> # </strong>
              <em> 3 </em>
            </li>
            <li id="key_AE04" class="left2">
              <strong> $ </strong>
              <em> 4 </em>
            </li>
            <li id="key_AE05" class="left2">
              <strong> % </strong>
              <em> 5 </em>
            </li>
            <li id="key_AE06" class="right2">
              <strong class="deadKey"> ^ </strong>
              <em> 6 </em>
            </li>
            <li id="key_AE07" class="right2">
              <strong> &amp; </strong>
              <em> 7 </em>
            </li>
            <li id="key_AE08" class="right3">
              <strong> * </strong>
              <em> 8 </em>
            </li>
            <li id="key_AE09" class="right4">
              <strong> ( </strong>
              <em> 9 </em>
            </li>
            <li id="key_AE10" class="right5">
              <strong> ) </strong>
              <em> 0 </em>
            </li>
            <li id="key_AE11" class="right5">
              <strong> _ </strong>
              <em> - </em>
            </li>
            <li id="key_AE12" class="right5">
              <strong> + </strong>
              <em> = </em>
              </li>
            <li id="key_BKSP" class="specialKey">
              <em>  </em>
            </li>
          </ul>
        </li>
        <li id="row_AD">
          <ul>
            <li id="key_TAB" class="specialKey">
              <em>  </em>
            </li>
            <li id="key_AD01" class="left5">
              <strong> Q </strong>
              <em> q </em>
            </li>
            <li id="key_AD02" class="left4">
              <strong> W </strong>
              <em> w </em>
            </li>
            <li id="key_AD03" class="left3">
              <strong> E </strong>
              <em> e </em>
            </li>
            <li id="key_AD04" class="left2">
              <strong> R </strong>
              <em> r </em>
            </li>
            <li id="key_AD05" class="left2">
              <strong> T </strong>
              <em> t </em>
            </li>
            <li id="key_AD06" class="right2">
              <strong> Y </strong>
              <em> y </em>
            </li>
            <li id="key_AD07" class="right2">
              <strong> U </strong>
              <em> u </em>
            </li>
            <li id="key_AD08" class="right3">
              <strong> I </strong>
              <em> i </em>
            </li>
            <li id="key_AD09" class="right4">
              <strong> O </strong>
              <em> o </em>
            </li>
            <li id="key_AD10" class="right5">
              <strong> P </strong>
              <em> p </em>
            </li>
            <li id="key_AD11" class="right5">
              <strong> &#123; </strong>
              <em> [ </em>
            </li>
            <li id="key_AD12" class="right5">
              <strong> } </strong>
              <em> ] </em>
            </li>
            <li id="key_BKSL" class="right5">
              <strong> | </strong>
              <em> \ </em>
            </li>
          </ul>
        </li>
        <li id="row_AC">
          <ul>
            <li id="key_CAPS" class="specialKey">
              <em>  </em>
            </li>
            <li id="key_CAPS105" class="hiddenKey">
              &nbsp;
            </li>
            <li id="key_AC01" class="left5">
              <strong> A </strong>
              <em> a </em>
            </li>
            <li id="key_AC02" class="left4">
              <strong> S </strong>
              <em> s </em>
            </li>
            <li id="key_AC03" class="left3">
              <strong> D </strong>
              <em> d </em>
            </li>
            <li id="key_AC04" class="left2">
              <strong> F </strong>
              <em> f </em>
            </li>
            <li id="key_AC05" class="left2">
              <strong> G </strong>
              <em> g </em>
            </li>
            <li id="key_AC06" class="right2">
              <strong> H </strong>
              <em> h </em>
            </li>
            <li id="key_AC07" class="right2">
              <strong> J </strong>
              <em> j </em>
            </li>
            <li id="key_AC08" class="right3">
              <strong> K </strong>
              <em> k </em>
            </li>
            <li id="key_AC09" class="right4">
              <strong> L </strong>
              <em> l </em>
            </li>
            <li id="key_AC10" class="right5">
              <strong> : </strong>
              <em> ; </em>
            </li>
            <li id="key_AC11" class="right5">
              <strong class="deadKey"> '"' </strong>
              <em class="deadKey"> ´ </em>
            </li>
            <li id="key_RTRN" class="specialKey">
              <em>  </em>
            </li>
            <li id="key_RTRN105" class="hiddenKey">
              &nbsp;
            </li>
          </ul>
        </li>
        <li id="row_AB">
          <ul>
            <li id="key_LFSH" class="specialKey">
              <em>  </em>
            </li>
            <li id="key_LSGT" class="left5">
              <strong> \ </strong>
              <em> | </em>
            </li>
            <li id="key_AB01" class="left5">
              <strong> Z </strong>
              <em> z </em>
            </li>
            <li id="key_AB02" class="left4">
              <strong> X </strong>
              <em> x </em>
            </li>
            <li id="key_AB03" class="left3">
              <strong> C </strong>
              <em> c </em>
            </li>
            <li id="key_AB04" class="left2">
              <strong> V </strong>
              <em> v </em>
            </li>
            <li id="key_AB05" class="left2">
              <strong> B </strong>
              <em> b </em>
            </li>
            <li id="key_AB06" class="right2">
              <strong> N </strong>
              <em> n </em>
            </li>
            <li id="key_AB07" class="right2">
              <strong> M </strong>
              <em> m </em>
            </li>
            <li id="key_AB08" class="right3">
              <strong> &lt; </strong>
              <em> , </em>
            </li>
            <li id="key_AB09" class="right4">
              <strong> &gt; </strong>
              <em> . </em>
            </li>
            <li id="key_AB10" class="right5">
              <strong> ? </strong>
              <em> / </em>
            </li>
            <li id="key_RTSH" class="specialKey">
              <em>  </em>
            </li>
          </ul>
        </li>
        <li id="row_AA">
          <ul>
            <li id="key_LCTL" class="specialKey">
              <em> ctrl </em>
            </li>
            <li id="key_LWIN" class="specialKey">
              <em> super </em>
            </li>
            <li id="key_LALT" class="specialKey">
              <em> Alt </em>
            </li>
            <li id="key_SPCE" class="thumb">
              <em> </em>
            </li>
            <li id="key_RALT" class="specialKey">
              <em> AltGr </em>
            </li>
            <li id="key_RWIN" class="specialKey">
              <em> super </em>
            </li>
            <li id="key_MENU" class="specialKey">
              <em> menu </em>
            </li>
            <li id="key_RCTL" class="specialKey">
              <em> ctrl </em>
            </li>
          </ul>
        </li>
      </ul>;
    }
});

