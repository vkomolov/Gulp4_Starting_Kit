'use strict';
const data = require('./partial/data3');
const func = require('./partial/data4');

console.log(data);
func(data);

const funcRun = (data) => func(data);

funcRun(data);