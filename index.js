'use strict';
const { chain, throttle } = require('lodash');

const getActionName = function getActionName(name) {
  return chain(name).camelCase().upperFirst().value();
};

const ActionMixin = {
  onThrottledAction(name, options = { wait: 0 }, ...params) {
    return throttle((...args) => {
      this['onThrottledAction' + getActionName(name)].apply(this, args.concat(params));
    }, options.wait, options);
  },

  onAction(name, ...params) {
    return (...args) => {
      this['onAction' + getActionName(name)].apply(this, args.concat(params));
    };
  }
};

module.exports = ActionMixin;
