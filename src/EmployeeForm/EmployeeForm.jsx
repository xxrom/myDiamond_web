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
    console.log(labels.employee_label);
    return (
      <div>
        <h3>Добавить нового сотрудника</h3>
        <AddEmployee labels={labels.employee_label} />
        <AddEmployee labels={labels.rate_label} />
        <SubmitButton
          onSubmit={this.onSubmit}
          disabled={true}
          buttonTitle="Добавить сотрудника"
        />
      </div>
    );
  }
}

export default EmployeeForm;
