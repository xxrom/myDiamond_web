import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';

import { Header } from './components/smart/';
import { EmployeeForm, EmployeeTable, Table, WorkForm } from './pages/';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Header} />
        <Route path="/" exact component={Table} />
        <Route path="/employee-form" component={EmployeeForm} />
        <Route path="/employee-table" component={EmployeeTable} />
        <Route path="/work-form" component={WorkForm} />
      </div>
    );
  }
}

export default hot(module)(App);
