# attr-scope

invoke constructors at attributes to provide controller scopes for
[attractor](https://github.com/substack/attractor)

# example

``` js
var observe = require('observable');
var attractor = require('attractor');
var scope = { Robot: Robot };

function Robot (elem) {
    this.counter = observe(0);
}
Robot.prototype.click = function () {
    this.counter(this.counter() + 1);
};

var attr = attractor({
    'x-scope': require('attr-scope'),
    'x-bind': require('attr-bind'),
    'x-click': [ require('attr-ev'), 'click' ]
}, scope);
attr.scan(document);
```

then write some html:

``` html
<html>
  <body>
    <div x-scope="robot">
      BEEPY [<span x-bind="counter"></span>]
      <button x-click="vote">vote</button>
    </div>
    
    <div x-scope="robot">
      BOOPS [<span x-bind="counter"></span>]
      <button x-click="vote">vote</button>
    </div>
    
    <script src="bundle.js"></script>
  </body>
</html>
```

# methods

``` js
var xscope = require('attr-scope')
```

This module is meant to be used with
[attractor](https://github.com/substack/attractor), but you can use the module
directly too.

## var handle = xscope(cb)

Create a new `handle(elem, rootkey)` that you can call to perform lookups.

When a value is found, `cb(value, rootkey)` fires with the resolved `value`.

## handle.call({ _selectors: {}, scope: {} }, elem, rootkey)

Call the `handle` in the context of a `scope` property to use for variable
lookups. The attribute name keys of the `_selectors` object will be looked up in
the html element `elem` and the lookup strings will be rewritten to use a
generated `_scope` parameter to hold the instantiated references in `scope` at
`rootkey`.

If the value at `rootkey` is a function, it will be instantiated with
`new node(elem, this)` for the supplied element `elem` and the context `this`.

# install

With [npm](https://npmjs.org) do:

```
npm install attr-scope
```

# license

MIT
