(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libDom = require('lib/dom');

var Filters = {
    currency: function currency(number) {
        return '$' + parseInt(number).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
};

var InputUpdate = (function () {
    function InputUpdate(input) {
        var _this = this;

        _classCallCheck(this, InputUpdate);

        this.shown = false;

        this.input = input;
        this.target = (0, _libDom.findOne)(input.dataset['update']);
        this.filter = input.dataset['filter'];

        this.input.addEventListener('keyup', function () {
            var value = _this.input.value;
            _this.update(value);
        });
    }

    _createClass(InputUpdate, [{
        key: 'update',
        value: function update(value) {
            if (this.filter) {
                value = Filters[this.filter](value);
            }

            this.target.textContent = value;
        }
    }], [{
        key: 'initAll',
        value: function initAll() {
            var els = (0, _libDom.findAll)('input[data-update]');
            return els.map(function (input) {
                return new InputUpdate(input);
            });
        }
    }]);

    return InputUpdate;
})();

exports.InputUpdate = InputUpdate;

},{"lib/dom":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _componentsInputUpdate = require('components/input-update');

function init() {
    console.log('About loaded!');
    _componentsInputUpdate.InputUpdate.initAll();
}

if (!window.bundles) {
    window.bundles = {};
}
window.bundles['pages/about'] = { init: init };
exports.init = init;

},{"components/input-update":1}]},{},[3]);
