import React, { Component } from 'react';

class SubmitButton extends Component {
  render() {
    return <button onClick={this.props.onSubmit}>Добавить</button>;
  }
}

export default SubmitButton;
