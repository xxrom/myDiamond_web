import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';

import Header from './Header';
import About from './About';
import Table from './Table';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Table} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

export default hot(module)(App);
