'use strict';
const data = require('./partial/data1');
const func = require('./partial/data2');

console.log(data);
func(data);

const funcRun = (data) => func(data);

funcRun(data);