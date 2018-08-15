import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import './AddEmployee.css';
import { TextInputs, SubmitButton } from './templates';
import { constructorInit, initMethods } from './libs';

class AddEmployee extends Component {
  static propTypes = {
    labels: PropTypes.array.isRequired,
  };
  constructor(props) {
    super(props);
    console.log(props);
    constructorInit.call(this, props);
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
