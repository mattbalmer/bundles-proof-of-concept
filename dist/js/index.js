(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _servicesLoader = require('services/loader');

var _servicesLoader2 = _interopRequireDefault(_servicesLoader);

var Tab = (function () {
    function Tab(_ref) {
        var trigger = _ref.trigger;
        var content = _ref.content;

        _classCallCheck(this, Tab);

        this.shown = false;

        this.trigger = trigger;
        this.content = content;
        this.bundle = content.dataset['requiresBundle'];
    }

    _createClass(Tab, [{
        key: 'loadBundles',
        value: function loadBundles() {
            var _this = this;

            _servicesLoader2['default'].load(this.bundle).then(function () {
                return console.log('Loaded bundle: ' + _this.bundle);
            })['catch'](function () {
                return console.error('Unable to load script ' + _this.bundle);
            }).then(function () {
                window.bundles[_this.bundle].init();
            });
        }
    }, {
        key: 'show',
        value: function show() {
            if (!this.shown) {
                this.loadBundles();
            }

            this.content.classList.add('visible');

            this.shown = true;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.content.classList.remove('visible');
        }
    }]);

    return Tab;
})();

exports.Tab = Tab;

},{"services/loader":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libDom = require('lib/dom');

var _tab = require('./tab');

var Tabs = (function () {
    function Tabs(container) {
        var _this = this;

        _classCallCheck(this, Tabs);

        this.currentTab = null;

        var triggers = (0, _libDom.findAll)(container, '[data-tab]');

        this.tabs = triggers.map(function (trigger) {
            var target = trigger.href.replace(location.origin, '');
            var content = (0, _libDom.findOne)(container, '[data-tab-content="' + target + '"]');
            console.log('[data-tab-content="' + target + '"]', content);
            return new _tab.Tab({ trigger: trigger, content: content });
        });

        this.select(this.tabs[0]);

        this.tabs.forEach(function (tab) {
            tab.trigger.addEventListener('click', function (e) {
                e.preventDefault();
                _this.select(tab);
            });
        });
    }

    _createClass(Tabs, [{
        key: 'select',
        value: function select(tab) {
            if (this.currentTab) {
                this.currentTab.hide();
            }

            this.currentTab = tab;

            tab.show();
        }
    }], [{
        key: 'initAll',
        value: function initAll() {
            var tabs = (0, _libDom.findAll)('[data-tabs]');
            return tabs.map(function (el) {
                return new Tabs(el);
            });
        }
    }]);

    return Tabs;
})();

exports.Tabs = Tabs;

},{"./tab":1,"lib/dom":4}],3:[function(require,module,exports){
'use strict';

var _componentsTabs = require('components/tabs');

document.addEventListener('DOMContentLoaded', function () {
    console.log('Loaded');
    _componentsTabs.Tabs.initAll();
});

},{"components/tabs":2}],4:[function(require,module,exports){
/**
 * Creates a DOM element from an HTML string.
 *
 * @param {string} html The HTML string to render.
 * @returns {Element} The DOM element constructed.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createElement = createElement;
exports.findAll = findAll;
exports.findOne = findOne;

function createElement(html) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    return wrapper.firstElementChild;
}

/**
 * Finds all elements matching the given selector, within the given root element.
 *
 * @param {Element=document} root The root element to search under.
 * @param {string|Array.<string>} selectors The selectors to query for. If an array,
 * all results are flattened.
 * @returns {Array.<Element>}
 */

function findAll(root, selectors) {
    if (arguments.length == 1) {
        selectors = root;
        root = document.documentElement || document.body;
    }

    if (!Array.isArray(selectors)) {
        selectors = [selectors];
    }

    // Grab elements from all selectors.
    selectors = selectors.map(function (selector) {
        return Array.prototype.slice.call(root.querySelectorAll(selector), 0);
    });

    // Flatten the elements from all of the selectors.
    return selectors.reduce(function (all, single) {
        return all.concat(single);
    }, []);
}

/**
 * Finds a single elemnt matching the given selector, within the given root element.
 *
 * @param {Element=document} root The root element to search under.
 * @param {string} selector The selector to query for.
 * @returns {Element}
 */

function findOne(root, selector) {
    if (arguments.length == 1) {
        selector = root;
        root = document.documentElement || document.body;
    }
    return root.querySelector(selector);
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var loader = {
    base: '/js/',

    load: function load(bundle) {
        return new Promise(function (resolve, reject) {
            var src = loader.base + bundle + '.js';
            var script = document.createElement("script");

            script.type = "text\/javascript";
            script.onerror = function () {
                return reject();
            };
            script.onload = function () {
                return resolve();
            };

            document.head.appendChild(script);
            script.src = src;
        });
    }
};

exports['default'] = loader;
module.exports = exports['default'];

},{}]},{},[3]);
