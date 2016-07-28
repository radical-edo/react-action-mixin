'use strict';

var _require = require('lodash');

var chain = _require.chain;
var throttle = _require.throttle;


var getActionName = function getActionName(name) {
  return chain(name).camelCase().upperFirst().value();
};

var ActionMixin = {
  onThrottledAction: function onThrottledAction(name) {
    for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }

    var _this = this;

    var options = arguments.length <= 1 || arguments[1] === undefined ? { wait: 0 } : arguments[1];

    return throttle(function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this['onThrottledAction' + getActionName(name)].apply(_this, args.concat(params));
    }, options.wait, options);
  },
  onAction: function onAction(name) {
    var _this2 = this;

    for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      params[_key3 - 1] = arguments[_key3];
    }

    return function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      _this2['onAction' + getActionName(name)].apply(_this2, args.concat(params));
    };
  }
};

module.exports = ActionMixin;