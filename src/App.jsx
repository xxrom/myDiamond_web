import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';

import Main from './Main';
import About from './About';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Main} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default hot(module)(App);
