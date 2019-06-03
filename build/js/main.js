(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var funcs = require('./partial/funcs');

var testing = require('./partial/test');

var newfunc = require('./partial/addTest');

console.log(funcs.test());
console.log(testing.hello());
console.log(newfunc.addTest());

},{"./partial/addTest":2,"./partial/funcs":3,"./partial/test":4}],2:[function(require,module,exports){
'use strict';

module.exports = {
  addTest: function addTest() {
    return "message from addTest.js!!!";
  }
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = {
  test: function test() {
    return "message from funcs.js";
  }
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = {
  hello: function hello() {
    return "message f///rom test.js";
  }
};

},{}]},{},[1])
//# sourceMappingURL=main.js.map
