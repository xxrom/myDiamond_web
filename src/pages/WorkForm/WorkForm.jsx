import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './WorkForm.css';

/**
 * Список полей выводящийся по схеме (schema)
 *
 * @param {string} name - имя блока
 */
class WorkForm extends Component {
  static = {
    // name: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      class: {},
    };
  }
  render() {
    return <h1>WorkForm</h1>;
  }
}

export { WorkForm };
