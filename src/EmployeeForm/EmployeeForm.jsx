import React, { Component } from 'react';

import AddEmployee from '../common/AddEmployee';
import { labels } from './libs';
import { SubmitButton } from './templates';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = () => {
      console.log('OnSubmit');
    };
  }
  render() {
    return (
      <div>
        <h3>Добавить нового сотрудника</h3>
        <AddEmployee labels={labels} />
        <SubmitButton onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default EmployeeForm;
