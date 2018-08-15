import React, { Component } from 'react';

import AddEmployee from '../AddEmployee';
import { labels } from './libs';

class EmployeeForm extends Component {
  render() {
    return <AddEmployee labels={labels} />;
  }
}

export default EmployeeForm;
