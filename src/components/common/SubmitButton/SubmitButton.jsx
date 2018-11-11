import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SubmitButton.css';

class SubmitButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    buttonType: PropTypes.string,
    style: PropTypes.object,
  };
  render() {
    let style = {};

    switch (this.props.buttonType) {
      case 'delete':
        style = {
          backgroundColor: '#f00',
          border: '2px solid #f00',
        };
        break;
    }

    return (
      <button
        className={`submit-button ${this.props.disabled ? '' : 'valid'} ${
          this.props.buttonType
        }`}
        disabled={this.props.disabled}
        onClick={this.props.onSubmit}
        style={{
          ...style,
          ...(this.props.style || {}),
        }}
      >
        {this.props.buttonTitle}
      </button>
    );
  }
}

export { SubmitButton };
