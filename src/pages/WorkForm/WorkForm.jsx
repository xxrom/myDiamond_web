import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './WorkForm.css';

import { schema } from './libs/';

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
    return <h3>Добавить новую работу.</h3>;
  }
}

export { WorkForm };
