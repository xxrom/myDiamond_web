import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import './AddEmployee.css';
import { TextInputs, SubmitButton } from './templates';
import { constructorInit, initMethods } from './libs';

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    constructorInit.call(this);
  }

  componentWillMount() {
    initMethods.call(this);
  }

  render() {
    return (
      <Paper className="employee-wrapper">
        <h2 className="employee-text">Добавить нового сотрудника</h2>

        <TextInputs
          values={this.state.values}
          labels={this.labels}
          handleOnChange={this.handleOnChange}
        />

        <SubmitButton
          disableBtn={this.state.disableBtn}
          sendData={this.sendData}
        />
      </Paper>
    );
  }
}

export default AddEmployee;
