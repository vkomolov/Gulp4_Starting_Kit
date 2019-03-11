(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var data = require('./partial/data1');

var func = require('./partial/data2');

console.log(data);
func(data);

var funcRun = function funcRun(data) {
  return func(data);
};

funcRun(data);

},{"./partial/data1":2,"./partial/data2":3}],2:[function(require,module,exports){
'use strict';

module.exports = 'DATA aaaa';

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function (text) {
  console.log(text);
};

},{}]},{},[1])
//# sourceMappingURL=bundle.js.map
