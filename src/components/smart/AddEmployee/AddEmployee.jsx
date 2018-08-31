import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { DeleteButtonSmall } from '../../common/';
import './AddEmployee.css';

/**
 * Список полей выводящийся по схеме (schema)
 *
 * @param {string} name - имя блока
 * @param {array} schema - схема всего блока
 * @param {object} values - значения для инпутов и валидация
 * @param {func} handleOnChange - вызов ф по изменению
 * @param {func} handleOnDelete - вызов ф по клику на удалить
 */
class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        inputsWrapper: styles.inputsWrapper,
      },
    };
  }

  /**
   * Удаление блока по его имени (name)
   *
   * @param {string} name - имя блока (передаем из .map)
   * @param {object} e - уже сам вызов произошел по клику
   */
  onDelete = (name) => (e) => {
    // Сначала скрываем блок (сжимаем его)
    this.setState({
      styles: {
        ...this.state.styles,
        inputsWrapper: styles.inputsWrapperHide,
      },
    });
    setTimeout(
      function(name) {
        // Полностью скрываем блок из html
        this.setState({
          styles: {
            ...this.state.styles,
            inputsWrapper: styles.inputsWrapperDeleted,
          },
        });
        // Возвращаем функцию
        return this.props.handleOnDelete(name);
      }.bind(this),
      500
    );
  };
  render() {
    const { name, schema, handleOnChange, values, settings } = this.props;
    const button = settings.delete ? (
      <DeleteButtonSmall className="delete-btn" onClick={this.onDelete(name)} />
    ) : null;

    return (
      <Paper style={this.state.styles.inputsWrapper} className="inputs-wrapper">
        {schema.map(({ label, key, regexp }) => (
          <div className="div-input-wrapper" key={`${label}${key}`}>
            <TextField
              label={label}
              className="input"
              onChange={handleOnChange(name, key, regexp)}
              error={!values[key].valid}
              value={values[key].value}
              fullWidth
            />
          </div>
        ))}
        {button}
      </Paper>
    );
  }
}

const styles = {
  inputsWrapper: {
    maxHeight: '1000px',
  },
  inputsWrapperHide: {
    padding: 0,
    margin: 0,
    maxHeight: '0px',
    backgroundColor: 'gray',
  },
  inputsWrapperDeleted: {
    display: 'none',
  },
};

AddEmployee.propTypes = {
  name: PropTypes.string.isRequired,
  schema: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleOnDelete: PropTypes.func.isRequired,
};

export { AddEmployee };
