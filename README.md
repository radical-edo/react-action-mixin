# react-action-mixin
This mixin is gives a better, nicer, prettier way of providing handlers to the `React.js` components that need to act on a certain event. Usally those are the **"smart"** components (or **"controlled"**, which ever you prefer).

### Installation

```bash
npm instal --save react-action-mixin
```

##### React.createClass
With `React`'s standard "classes" just use the `mixin` property, like so:

```js
const ActionMixin = require('react-action-mixin');

const MySmartComponent = React.createClass({
  mixin: [ActionMixin],
  // ...
});
```
And you're all set and good to go

##### React.Component ES6 class
Since `React`, when using **ES6 classes**, doesn't support any type of mixins we cannot use it so freely. There is a way around it, though, like so:

```js
// `smart_component.jsx`
import React, { Component } from 'react';
import ActionMixin from 'react-action-mixin';
class SmartComponent extends Component {
  constructor(props) {
    super(props):
    Object.assign(this, ActionMixin);
  }
}
export default SmartComponent;

// `my_smart_component.jsx`
import React from 'react';
import SmartComponent from './smart_component';

class MySmartComponent extends SmartCompoent {
  // ...
}
```
This way you can use it in your project when you prefered the **ES6** version.

### API

##### onAction(string, ...additional_parameters)
* `string` will be used to call the handler that you want on the component. The function invoked will use the following startegy to build the function name: `'onAction'` + `camelCased` and `capitalized` version of the `string` provided, for example: `this.onAction('do stuff')` will call `this.onActionDoStuff()`
* `additional_parameters` - any number of parameters provided here will be accessible as after the last argument from the called handler, for example:
```js
<input onChange={this.onAction('do stuff', { foo: 'bar' }) value={email} />

onActionDoStuff(ev, fooBar) {
  // foobar => { foo: 'bar' }
}
```
* ###### Keep in mind if there would be more arguments from invoked handler `fooBar` object may be accessible as the **3rd**, **4th** or **n-th** argument 

##### onThrottledAction(string, options, ...additional_parameters)
This function will work the same as `onAction`, with the following exceptions:
* function name that will be build will use the `string` in the same manner as in `onAction`, but the first part is **NOT** `onAction`, but **`onThrottledAction`**
* `options` object is used to pass down to `throttle` function from `lodash`, it will not be passed when the handler is funally invoked. To know more about the `options` object and `throttle` function, please follow [this link](https://lodash.com/docs#throttle). `options` by **default** is set to

```js
  options = { wait: 0 };
```

### Examples

```js
const ActionMixin = require('react-action-mixin');

const MySmartComponent = React.createClass({
  mixin: [ActionMixin],
  
  getInitialState() {
    return {
      email: '',
      password: ''
    }
  },
  
  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.onAction('submit')>
        <input onChange={this.onAction('change') name="email" value={email} />
        <input onChange={this.onAction('change') name="password" value={password} />
        <button type="submit">Log In</button>
      </form>
    );
  },
  
  onActionSubmit(ev) {
    ev.preventDefault();
    // do login stuff
  },
  
  onActionChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }
});
```
