import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';

import Header from './Header';
import Employee from './Employee';
import EmployeeTable from './EmployeeTable';
import Table from './Table';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Table} />
        <Route path="/employee" component={Employee} />
        <Route path="/employee-table" component={EmployeeTable} />
      </div>
    );
  }
}

export default hot(module)(App);
