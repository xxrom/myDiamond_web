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
 * @param {object} settings - настройки блока
 * @see {bool} settings.delete - можно удалять или нет блок
 * @param {func} handleOnChange - вызов ф по изменению
 * @param {func} handleOnDelete - вызов ф по клику на удалить
 */
class AddEmployee extends Component {
  static = {
    name: PropTypes.string.isRequired,
    schema: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleOnDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      class: {
        inputsWrapper: '',
      },
    };
  }

  componentDidMount() {
    // Aнимация добавления элемента AddEmployee
    setTimeout(() => {
      this.setState({
        class: {
          ...this.state.class,
          inputsWrapper: 'inputs-wrapper_max-height',
        },
      });
    }, 0);
  }

  /**
   * Удаление блока по его имени (name)
   *
   * @param {string} name - имя блока (передаем из .map)
   */
  onDelete = (name) => () => {
    // Сначала скрываем блок (сжимаем его)
    this.setState({
      class: {
        ...this.state.class,
        inputsWrapper: 'inputs-wrapper_hide',
      },
    });

    setTimeout(() => {
      // Передаем сигнал выше =)
      this.props.handleOnDelete(name);
    }, 500); // задержка перед удаление для анимации
  };

  render() {
    const { name, schema, handleOnChange, values, settings } = this.props;

    // name.indexOf('0') самый первый элемент нельзя удалять
    const deleteButton =
      settings.delete && name.indexOf('0') === -1 ? (
        <DeleteButtonSmall
          className="delete-btn"
          onClick={this.onDelete(name)}
        />
      ) : null;

    return (
      <Paper className={`inputs-wrapper ${this.state.class.inputsWrapper}`}>
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
        {deleteButton}
      </Paper>
    );
  }
}

export { AddEmployee };
