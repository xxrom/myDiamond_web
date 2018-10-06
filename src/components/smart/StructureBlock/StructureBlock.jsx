import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { DeleteButtonSmall } from '../../common/';
import './StructureBlock.css';

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
class StructureBlock extends Component {
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
    // Aнимация добавления элемента StructureBlock
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, schema, handleOnChange, values, settings } = this.props;

    console.log('values', values);
    console.log(this.state);
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
        {schema.map(({ label, key, regexp, type }) => {
          if (type === 'list') {
            return (
              <div className="div-input-wrapper" key={`${label}${key}`}>
                <FormControl
                  className="div-input-wrapper"
                  key={`${label}${key}`}
                >
                  <InputLabel shrink htmlFor="age-label-placeholder">
                    Age_Number
                  </InputLabel>
                  <Select
                    value={this.state.ageNumber}
                    onChange={this.handleChange}
                    input={
                      <Input name="ageNumber" id="age-label-placeholder" />
                    }
                    displayEmpty
                    name="ageNumber"
                  >
                    <MenuItem value="undefined">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>TwentyTwenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            );
          }
          return (
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
          );
        })}
        {deleteButton}
      </Paper>
    );
  }
}

/**
 * Изменение полей блоков
 * @param {string} name - имя блока всего
 * @param {string} key - идентификатор поля
 * @param {object} regexp - валидация поля
 */
const handleOnChange = (name, key, regexp) => (event) => {
  console.log('handleOnChange parent 1', event.target.value);
  console.log(`${name} ${key}`);
  this.setState({
    values: {
      ...this.state.values,
      [name]: {
        ...this.state.values[name],
        [key]: {
          value: event.target.value,
          valid: regexp.test(event.target.value),
        },
      },
    },
  });
};

export { StructureBlock, handleOnChange };
