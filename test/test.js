"use strict";

var assert = require('assert');

//
// setup
//

var throwsWithMessage = function (f, message) {
    assert['throws'](f, function (err) {
        ok(err instanceof Error);
        eq(err.message, message);
        return true;
    });
};

