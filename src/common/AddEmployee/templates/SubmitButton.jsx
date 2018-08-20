import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubmitButton extends Component {
  static propTypes = {
    disableBtn: PropTypes.bool.isRequired,
    sendData: PropTypes.func.isRequired,
  };
  render() {
    return (
      <button
        className={`add-btn ${this.props.disableBtn ? '' : 'valid'}`}
        disabled={this.props.disableBtn}
        onClick={this.props.sendData}
      >
        Добавить сотрудника
      </button>
    );
  }
}

export default SubmitButton;
