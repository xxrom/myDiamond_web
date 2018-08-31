import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SubmitButton.css';

class SubmitButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired,
  };
  render() {
    return (
      <button
        className={`submit-button ${this.props.disabled ? '' : 'valid'}`}
        disabled={this.props.disabled}
        onClick={this.props.onSubmit}
      >
        {this.props.buttonTitle}
      </button>
    );
  }
}

export { SubmitButton };
