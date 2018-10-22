import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import { DeleteButtonSmall, AutoSuggestionInput } from '../../common/';
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
  static propTypes = {
    name: PropTypes.string.isRequired,
    schema: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleOnDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    // Изначально кнопка удаления блок - отсутствует
    this.deleteButton = null;
    // Изначально у кнопки класс на полную высоту
    let inputsWrapperClassName = 'inputs-wrapper_max-height';

    if (
      this.props.settings.delete &&
      // name.indexOf('0') самый первый элемент нельзя удалять
      this.props.name.indexOf('0') === -1
    ) {
      this.deleteButton = (
        <DeleteButtonSmall
          className="delete-btn"
          onClick={this.onDelete(this.props.name)}
        />
      );

      // Включаем анимацию только у элементов, которые можно удалять
      inputsWrapperClassName = '';
    }

    this.state = {
      class: {
        inputsWrapper: inputsWrapperClassName,
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

  render() {
    const { name, schema, handleOnChange, values } = this.props;

    // Создание инпутов по schema
    const inputs = schema.map((item) => {
      const { label, key, regexp, type } = item;
      const shareProps = {
        label: label,
        value: values[key].value,
        onChange: handleOnChange(name, key, regexp, type),
      };

      // Определяем тип компонента input

      let component =
        type === 'list' ? (
          <AutoSuggestionInput
            {...shareProps}
            key={`${label}${key}`}
            keySelector={key}
            editable={item.editable}
          />
        ) : (
          <TextField
            {...shareProps}
            className="input"
            type={type}
            error={!values[key].valid}
            fullWidth
          />
        );

      return (
        <div className="div-input-wrapper" key={`${label}${key}`}>
          {component}
        </div>
      );
    });

    return (
      <Paper className={`inputs-wrapper ${this.state.class.inputsWrapper}`}>
        {inputs}
        {this.deleteButton}
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
