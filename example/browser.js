var observe = require('observ');
var attractor = require('attractor');
var scope = { robot: Robot };

function Robot (elem) {
    this.counter = observe(0);
}

Robot.prototype.vote = function () {
    this.counter.set(Number(this.counter()) + 1);
};

var attr = attractor({
    'x-scope': require('../'),
    'x-bind': require('attr-bind'),
    'x-click': [ require('attr-ev'), 'click' ]
}, scope);
attr.scan(document);
