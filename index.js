module.exports = function (cb) {
    return function (elem, rootkey) {
        var scope = this.scope;
        var node = scope[rootkey];
        if (typeof node === 'function') {
            node = new node(elem, this);
        }
        if (cb) cb(rootkey, node);
        
        if (!scope._scope) scope._scope = {};
        if (!scope._scope[rootkey]) scope._scope[rootkey] = [];
        var index = scope._scope[rootkey].length;
        scope._scope[rootkey].push(node);
        
        var keys = objectKeys(this._selectors);
        for (var i = 0; i < keys.length; i++) {
            var elems = elem.querySelectorAll('*[' + keys[i] + ']');
            for (var j = 0; j < elems.length; j++) {
                var name = elems[j].getAttribute(keys[i]);
                var parts = [ '_scope', rootkey, index, name ];
                elems[j].setAttribute(keys[i], parts.join('.'));
            }
        }
    };
};

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) keys.push(key);
    return keys;
};
