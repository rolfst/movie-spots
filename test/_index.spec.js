'use strict';
// load deps
const lab = exports.lab = require('lab').script()

global.expect = require('chai').expect
global.should = require('chai').should()

// prepare environment
global.it = lab.it
global.describe = lab.describe
global.before = lab.before
global.after = lab.after
global.beforeEach = lab.beforeEach
global.afterEach = lab.afterEach

// get the server

