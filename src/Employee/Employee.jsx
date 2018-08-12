import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import './Employee.css';
import { TextInputs } from './templates';
import { constructorInit, initMethods, sendData } from './libs';

class Employee extends Component {
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
          state={this.state}
          labels={this.labels}
          handleOnChange={this.handleOnChange}
        />

        <button
          className={`add-btn ${this.state.disableBtn ? '' : 'valid'}`}
          disabled={this.state.disableBtn}
          onClick={sendData(this.labels, this.state)}
        >
          Добавить сотрудника
        </button>
      </Paper>
    );
  }
}

export default Employee;
